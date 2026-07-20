import { tools } from "../data";

export default function InfiniteScrollTools() {
  return (
    <div className="relative py-10 bg-transparent overflow-hidden">
      {/* Container áp dụng mask-image để mờ dần 2 cạnh */}
      <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-scroll whitespace-nowrap w-max gap-6">
          {[...tools, ...tools].map((tool, index) => (
            <div
              key={index}
              className="min-w-50 h-28 rounded-2xl bg-card shadow-lg flex flex-col justify-center items-center px-4 py-2 text-center transition-transform duration-300 hover:scale-105"
            >
              <img src={tool.icon} alt={tool.name} className="h-10 w-10 object-contain mb-2" />
              <p className="text-sm font-semibold text-foreground">{tool.name}</p>
              <span className="text-xs text-muted-foreground">{tool.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
