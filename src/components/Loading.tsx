export default function Loading({
  text,
  size = 20,
}: {
  text: string;
  size?: number;
}) {
  return (
    <div
      className={`text-[${size}px] flex h-full w-full items-center justify-center font-light`}
    >
      {text}
    </div>
  );
}
