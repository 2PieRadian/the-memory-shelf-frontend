export default function Loading({ text }: { text: string }) {
  return (
    <div className="flex h-full w-full text-xl items-center justify-center font-light">
      {text}
    </div>
  );
}
