"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { Mail, User, Calendar, Clock, Shield } from "lucide-react";

const ProfilePage = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-16">
        <Card className="w-[90%] max-w-7xl bg-card border-none shadow-lg">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold">Not Signed In</h2>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Please sign in to view your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-16">
      <Card className="w-[90%] max-w-7xl bg-card border-none shadow-lg">
        <CardHeader>
          <div className="space-y-4 mt-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              {user.fullName}
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Account Information
                </h3>
                <div className="space-y-3">
                  <InfoItem
                    icon={User}
                    label="Username"
                    value={user.username || "Not set"}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Joined"
                    value={
                      user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Unknown"
                    }
                  />
                  <InfoItem
                    icon={Clock}
                    label="Last updated"
                    value={
                      user.updatedAt
                        ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Unknown"
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      className="capitalize"
                      variant={
                        user.primaryEmailAddress?.verification?.status ===
                        "verified"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {user.primaryEmailAddress?.verification?.status ||
                        "Unknown"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Email verification
                    </span>
                  </div>

                  {user.externalAccounts &&
                    user.externalAccounts.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Connected accounts
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {user.externalAccounts.map((account) => (
                            <Badge
                              key={account.id}
                              variant="outline"
                              className="capitalize"
                            >
                              {account.provider}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16">
      <Card className="w-[90%] max-w-7xl bg-card border-none shadow-lg">
        <CardHeader>
          <div className="space-y-4 w-full flex flex-col items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;