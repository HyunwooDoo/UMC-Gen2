import { type ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}
// 전체레이아웃을 flex-col: 세로 정렬로 바꿔줌
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#021526]">{children}</div>
  );
};

export default MainLayout;
