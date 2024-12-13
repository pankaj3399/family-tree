"use client";
import { useToast } from "@/hooks/use-toast";
import { treeService } from "@/services/treeService";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import {
  CirclePlus,
  HelpCircle,
  Home,
  LayoutDashboard,
  Loader2,
  LoaderCircle,
  LogOut,
  Menu,
  MessageSquare,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DesktopToggleTheme, MobileToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "#testimonials",
    label: "Testimonials",
    icon: <MessageSquare className="h-5 w-5 mr-2" />,
  },
  {
    href: "#team",
    label: "Team",
    icon: <Users className="h-5 w-5 mr-2" />,
  },
  {
    href: "#contact",
    label: "Contact",
    icon: <Home className="h-5 w-5 mr-2" />,
  },
  {
    href: "#faq",
    label: "FAQ",
    icon: <HelpCircle className="h-5 w-5 mr-2" />,
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Showcase Your Value ",
    description: "Highlight how your product solves user problems.",
  },
  {
    title: "Build Trust",
    description:
      "Leverages social proof elements to establish trust and credibility.",
  },
  {
    title: "Capture Leads",
    description:
      "Make your lead capture form visually appealing and strategically.",
  },
];

const LoadingSpinner = () => (
  <div className="animate-spin mr-2 hidden xl:block">
    <Loader2 className="h-5 w-5 text-muted-foreground" />
  </div>
);

const ProfileDropdown = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="flex gap-2">
            <User className="h-5 w-5" />
            <span className="block lg:hidden">Profile</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 outline-none border-gray-800"
      >
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
          <SignOutButton>
            <div className="flex items-center w-full">
              <LogOut className="mr-2 h-5 w-5" />
              Sign out
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  const [createTreeDialogOpen, setCreateTreeDialogOpen] = useState(false);
  const [treeName, setTreeName] = useState("");
  const [treeCreating, setTreeCreating] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleTreeCreate = async () => {
    if (!treeName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tree name",
        variant: "destructive",
      });
      return;
    }

    try {
      setTreeCreating(true);
      const newTree = await treeService.createTree(treeName);
      toast({
        title: "Success",
        description: "Tree created successfully",
      });
      setCreateTreeDialogOpen(false);
      setTreeName("");

      router.push(`/family-tree/${newTree._id}/edit`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create tree",
        variant: "destructive",
      });
    } finally {
      setTreeCreating(false);
    }
  };

  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      {/* Logo - Always on the far left */}
      <Link
        href="/"
        className="font-bold text-xl flex items-center  lg:w-1/4 gap-3 ml-2"
      >
        <Image
          src="/logo/familytreecreator-logo.png"
          alt={"Logo"}
          height="32"
          width="32"
          className="rounded-md"
        />
        FamilyTreeCreator
      </Link>

      {/* Desktop Navigation - Center */}
      <NavigationMenu className="hidden xl:block mx-auto ">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                <Image
                  src="/api/placeholder/600/600"
                  alt="Feature Preview"
                  className="h-full w-full rounded-md object-cover"
                  width={600}
                  height={600}
                />
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <p className="mb-1 font-semibold leading-none text-foreground">
                        {title}
                      </p>
                      <p className="line-clamp-2 text-muted-foreground">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side: Auth controls for desktop, Menu for mobile */}
      <div className="flex items-center justify-end lg:w-1/4">
        {/* Desktop Auth Controls */}
        {!isLoaded ? (
          <LoadingSpinner />
        ) : isSignedIn ? (
          <div className="hidden xl:flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/dashboard" className="flex items-center gap-2">
                Dashboard
              </Link>
            </Button>

            <Dialog
              open={createTreeDialogOpen}
              onOpenChange={setCreateTreeDialogOpen}
            >
              <Tooltip>
                <TooltipTrigger>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 flex items-center gap-2 md:px-3"
                    >
                      <CirclePlus className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Now</p>
                </TooltipContent>
              </Tooltip>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Tree</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTreeCreate();
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Input
                        placeholder="Enter tree name"
                        value={treeName}
                        onChange={(e) => setTreeName(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={treeCreating}>
                        {treeCreating ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Tooltip>
              <TooltipTrigger>
                <Button asChild variant="ghost">
                  <DesktopToggleTheme />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Theme</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button asChild variant="ghost">
                  <ProfileDropdown />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2 ">
            <Button asChild variant="ghost">
              <DesktopToggleTheme />
            </Button>
            <SignInButton mode="redirect">
              <Button variant="ghost" size="icon" className="px-8 mr-2">
                Sign In
              </Button>
            </SignInButton>
          </div>
        )}

        {/* Mobile Menu Button - Far right */}
        <div className="xl:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Menu
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer mr-2"
              />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="flex flex-col justify-between rounded-tl-2xl rounded-bl-2xl bg-card border-secondary"
            >
              <div>
                <SheetHeader className="mb-6 ml-4">
                  <SheetTitle className="flex items-center">
                    <Link href="/" className="flex items-center text-xl">
                      <Image
                        src="/logo/familytreecreator-logo.png"
                        alt={"Logo"}
                        height="32"
                        width="32"
                        className="rounded-md mr-3"
                      />
                      FamilyTreeCreator
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  {routeList.map(({ href, label, icon }) => (
                    <Button
                      key={href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="ghost"
                      className="justify-start text-base"
                    >
                      <Link href={href} className="flex items-center">
                        {icon}
                        {label}
                      </Link>
                    </Button>
                  ))}
                  {!isLoaded ? (
                    <div className="px-3 py-2">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    isSignedIn && (
                      <>
                        <Button
                          onClick={() => setIsOpen(false)}
                          asChild
                          variant="ghost"
                          className="justify-start text-base"
                        >
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2"
                          >
                            <LayoutDashboard className="h-5 w-5 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button
                          onClick={() => setCreateTreeDialogOpen(true)} // Updated this line
                          variant="ghost"
                          className="justify-start text-base"
                        >
                          <div className="flex items-center gap-2">
                            <CirclePlus className="h-5 w-5 mr-2" />
                            Create
                          </div>
                        </Button>
                      </>
                    )
                  )}
                </div>
              </div>

              <div>
                <Separator className="mb-2" />
                <SheetFooter className="mt-auto w-full">
                  <div className="flex flex-col gap-2 w-full">
                    {!isLoaded ? (
                      <div className="px-3 py-2">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full flex justify-start px-3"
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link
                            href="/profile"
                            className="flex items-center gap-2"
                          >
                            <User className="h-5 w-5" />
                            Profile
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full flex justify-start"
                          asChild
                        >
                          <MobileToggleTheme />
                        </Button>
                        <Separator />
                        {isSignedIn ? (
                          <Button
                            variant="ghost"
                            className="w-full flex justify-start text-red-600 hover:text-red-600 hover:bg-red-100/10"
                            onClick={() => setIsOpen(false)}
                          >
                            <SignOutButton>
                              <div className="flex items-center">
                                <LogOut className="h-5 w-5 mr-1" />
                                Sign out
                              </div>
                            </SignOutButton>
                          </Button>
                        ) : (
                          <Button
                            asChild
                            variant="ghost"
                            className="w-full flex justify-start text-red-600 hover:text-red-600 hover:bg-red-100/10"
                          >
                            <SignInButton mode="redirect">
                              <div className="flex items-center">
                                <LogOut className="h-5 w-5 mr-1" />
                                Sign in
                              </div>
                            </SignInButton>
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
