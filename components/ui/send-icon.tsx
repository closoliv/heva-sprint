// The exact send icon/button graphic from heva's own product — a self-contained
// pill (blue background baked in) rather than an icon meant to sit inside one of
// our own colored buttons. Dim it via the wrapping <button disabled> + opacity,
// same as their own markup does, rather than swapping fills.
export function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
      <rect x="0.000915527" width="47.9991" height="32" rx="16" fill="#0056D6" />
      <path
        d="M17.2435 8.09302C16.5646 7.75358 15.812 8.39931 16.044 9.12218L17.6772 14.1983C17.7093 14.298 17.7682 14.3871 17.8476 14.4556C17.9269 14.5241 18.0235 14.5695 18.1269 14.5868L24.9093 15.7177C25.2276 15.7709 25.2276 16.228 24.9093 16.2811L18.1275 17.4115C18.024 17.4286 17.9272 17.474 17.8478 17.5425C17.7684 17.6111 17.7093 17.7002 17.6772 17.8L16.044 22.8778C15.8115 23.6007 16.564 24.2464 17.2435 23.907L31.526 16.7669C32.158 16.4509 32.158 15.5497 31.526 15.2331L17.2435 8.09302Z"
        fill="#FAFAFA"
      />
    </svg>
  );
}
