import { tools } from "../data";

export default function InfiniteScrollTools() {
  return (
    <div className="relative py-10 bg-transparent overflow-hidden">
      {/* Đã sửa cú pháp mask-image hoàn chỉnh và thêm webkit-mask cho tương thích mọi trình duyệt */}
      <div
        className="w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
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
