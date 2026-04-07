import "./globals.css";

export const metadata = {
  title: {
    default: "HR Greenroots Landscaping",
    template: "%s | HR Greenroots Landscaping",
  },
  description:
    "Explore HR Greenroots Landscaping for top-notch landscaping services. Transform your outdoor spaces with our expert team today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
