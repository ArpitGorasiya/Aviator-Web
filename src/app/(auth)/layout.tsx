import { AUTH_BG } from "@/lib/images";
import ImageCustom from "@/components/common/Image";

// export default async function AuthLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <section className="min-h-dvh flex flex-col md:flex-row">
//       <div className="flex-1 p-5 max-h-full w-full max-md:hidden">
//         <ImageCustom src={AUTH_BG} alt="AUTH_BG" className="w-full h-full" />
//       </div>
//       {children}
//     </section>
//   );
// }


export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 w-full h-screen max-md:hidden p-5">
        <ImageCustom
          src={AUTH_BG}
          alt="Authentication Background"
          className="w-full h-full object-contain"
        />
      </div>

      {/* <div className="flex-1 w-full"> */}
        {children}
      {/* </div> */}
    </section>
  );
}