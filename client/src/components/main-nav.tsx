import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Link, useLocation } from "@tanstack/react-router";

export function MainNav() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">name</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Docs
        </Link>
        <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components") &&
              !pathname?.startsWith("/docs/component/chart")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Components
        </Link>
        <Link
          href="/blocks"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Blocks
        </Link>
        <Link
          href="/charts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/component/chart") ||
              pathname?.startsWith("/charts")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Charts
        </Link>
        <Link
          href="/themes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Themes
        </Link>
        <Link
          href="/examples"
          className={cn(
            "hidden transition-colors hover:text-foreground/80 lg:inline-block",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Examples
        </Link>
        <Link
          href="/colors"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/colors")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Colors
        </Link>
      </nav>
    </div>
  );
}
