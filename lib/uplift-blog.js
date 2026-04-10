const UPLIFT_API_BASE = "https://seotoolstaging.site/api/public/v1";
const UPLIFT_REVALIDATE_SECONDS = 3600;

function getToken() {
  return process.env.UPLIFT_BLOG_API_TOKEN?.trim() || "";
}

function stripHtml(html = "") {
  return html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|section|article|h1|h2|h3|h4|h5|h6)>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function trimText(text = "", maxLength = 180) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function getParagraphs(content = "") {
  return stripHtml(content)
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function decodeEntities(text = "") {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function sanitizeBlogHtml(html = "") {
  const blockedTags = /<(script|style|iframe|object|embed|form|button|input|textarea|select)[^>]*>[\s\S]*?<\/\1>/gi;
  const stripped = html
    .replace(blockedTags, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\sstyle\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\s(src|href)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, "");

  const allowedTags = new Set([
    "p",
    "br",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "strong",
    "em",
    "b",
    "i",
    "a",
    "blockquote",
    "img",
    "hr",
  ]);

  return stripped.replace(/<\/?([a-z0-9-]+)([^>]*)>/gi, (match, rawTag, rawAttrs) => {
    const tag = String(rawTag).toLowerCase();
    if (!allowedTags.has(tag)) {
      return "";
    }

    if (match.startsWith("</")) {
      return `</${tag}>`;
    }

    if (tag === "br" || tag === "hr") {
      return `<${tag}>`;
    }

    if (tag === "a") {
      const hrefMatch = rawAttrs.match(/\shref\s*=\s*(['"])(.*?)\1/i);
      const href = hrefMatch?.[2]?.trim() || "#";
      const safeHref = /^(https?:|mailto:|tel:|\/)/i.test(href) ? href : "#";
      return `<a href="${safeHref}" rel="noreferrer noopener">`;
    }

    if (tag === "img") {
      const srcMatch = rawAttrs.match(/\ssrc\s*=\s*(['"])(.*?)\1/i);
      const altMatch = rawAttrs.match(/\salt\s*=\s*(['"])(.*?)\1/i);
      const src = srcMatch?.[2]?.trim() || "";
      const alt = decodeEntities(altMatch?.[2] || "");
      if (!/^https?:\/\//i.test(src) && !src.startsWith("/")) {
        return "";
      }
      return `<img src="${src}" alt="${alt}">`;
    }

    return `<${tag}>`;
  });
}

function hasHtmlContent(content = "") {
  return /<\s*(p|h1|h2|h3|h4|ul|ol|li|blockquote|img|br|strong|em|a)\b/i.test(content);
}

function normalizeBlog(blog) {
  const plainContent = stripHtml(blog.content ?? "");
  const paragraphs = getParagraphs(blog.content ?? "");
  const excerpt = blog.excerpt?.trim() || trimText(paragraphs[0] || plainContent, 200);

  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt,
    content: blog.content ?? "",
    contentHtml: hasHtmlContent(blog.content ?? "") ? sanitizeBlogHtml(blog.content ?? "") : "",
    hasRichContent: hasHtmlContent(blog.content ?? ""),
    plainContent,
    paragraphs,
    status: blog.status,
    publishDate: blog.publishDate ?? "",
    publishTime: blog.publishTime ?? "",
    featuredImage: blog.featuredImage || "",
    categories: Array.isArray(blog.categories) ? blog.categories : [],
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    seoScore: blog.seoScore ?? null,
    createdAt: blog.createdAt ?? "",
    updatedAt: blog.updatedAt ?? "",
    authorName: blog.authorName || "Uplift",
    authorUrl: blog.authorUrl || "",
    freshness: blog.freshness ?? null,
    meta: blog.meta ?? {},
    customFields: blog.customFields ?? {},
  };
}

async function requestUplift(pathname) {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${UPLIFT_API_BASE}${pathname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: UPLIFT_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export async function getPublishedBlogs({ limit = 12 } = {}) {
  const payload = await requestUplift(`/blogs?page=1&limit=${limit}&status=PUBLISH`);
  const blogs = payload?.data?.blogs;

  if (!Array.isArray(blogs)) {
    return [];
  }

  return blogs.map(normalizeBlog);
}

export async function getPublishedBlogSlugs() {
  const blogs = await getPublishedBlogs({ limit: 100 });
  return blogs.map((blog) => blog.slug);
}

export async function getPublishedBlogBySlug(slug) {
  if (!slug) {
    return null;
  }

  const payload = await requestUplift(`/blog/${slug}`);
  const blog = payload?.data?.blog;

  if (!blog || blog.status === "DRAFT") {
    return null;
  }

  return normalizeBlog(blog);
}

export function getBlogTitle(blog) {
  return blog?.meta?.seoTitle?.trim() || blog?.title || "Blog";
}

export function getBlogDescription(blog) {
  return (
    blog?.meta?.seoDescription?.trim() ||
    blog?.excerpt?.trim() ||
    trimText(blog?.plainContent || "", 170) ||
    "Read the latest article from HR Greenroots Landscaping."
  );
}

export function getBlogOgImage(blog, fallbackImage = "") {
  return blog?.featuredImage || fallbackImage;
}
