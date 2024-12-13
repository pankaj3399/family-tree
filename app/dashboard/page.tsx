"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  Crown,
  Download,
  Edit,
  Plus,
  Trash2,
  Users,
  LoaderCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { treeService, FamilyTree } from "@/services/treeService";
import { Input } from "@/components/ui/input";

interface UserPlan {
  type: string;
  maxMembers: number;
  maxTrees: number;
  price: string;
}

const Dashboard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [familyTrees, setFamilyTrees] = useState<FamilyTree[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTree, setSelectedTree] = useState<string | null>(null);
  const [createTreeDialogOpen, setCreateTreeDialogOpen] = useState(false);
  const [treeName, setTreeName] = useState("");
  const [treeCreating, setTreeCreating] = useState(false);

  const userPlan: UserPlan = {
    type: "Basic",
    maxMembers: 40,
    maxTrees: 10,
    price: "€29.99",
  };

  const optimisticUpdate = async <T,>(
    action: () => Promise<T>,
    rollback: () => void,
    successMsg: string
  ) => {
    try {
      await action();
      toast({ title: "Success", description: successMsg });
    } catch (error) {
      rollback();
      toast({
        title: "Error",
        description: "Operation failed. Changes reverted.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    try {
      const data = await treeService.fetchTrees();
      setFamilyTrees(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load trees",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const prevTrees = [...familyTrees];
    setFamilyTrees((trees) => trees.filter((tree) => tree._id !== id));
    setShowDeleteDialog(false);

    await optimisticUpdate(
      async () => await treeService.deleteTree(id),
      () => setFamilyTrees(prevTrees),
      "Tree deleted successfully"
    );
  };

  const createNewTree = async () => {
    if (!treeName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tree name",
        variant: "destructive",
      });
      return;
    }

    if (familyTrees.length >= userPlan.maxTrees) {
      toast({
        title: "Error",
        description: "Maximum trees limit reached",
        variant: "destructive",
      });
      return;
    }

    setTreeCreating(true);
    const tempId = `temp-${Date.now()}`;
    const tempTree: FamilyTree = {
      _id: tempId,
      name: treeName,
      createdAt: new Date().toISOString().split("T")[0],
      memberCount: 0,
      lastModified: new Date().toISOString().split("T")[0],
      template: "Modern",
    };

    const prevTrees = [...familyTrees];
    setFamilyTrees((prev) => [...prev, tempTree]);

    await optimisticUpdate(
      async () => {
        const newTree = await treeService.createTree(treeName);
        setFamilyTrees((prev) =>
          prev.map((tree) => (tree._id === tempId ? newTree : tree))
        );
        setCreateTreeDialogOpen(false);
        setTreeName("");
        // router.push(`/family-tree/${newTree._id}/edit`);
      },
      () => setFamilyTrees(prevTrees),
      "Tree created successfully"
    );
    setTreeCreating(false);
  };

  const handleExport = async (id: string) => {
    try {
      const tree = familyTrees.find((t) => t._id === id);
      if (!tree) throw new Error();

      const treeData = await treeService.exportTree(id);
      treeService.generateExportFile(treeData);

      toast({
        title: "Success",
        description: "Tree exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Export may be incomplete or invalid",
        variant: "destructive",
      });
    }
  };

  const navigateToEdit = (id: string) => {
    router.push(`/family-tree/${id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[90dvh]">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto p-4 space-y-6 mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Family Trees</h1>
          <p className="text-muted-foreground mt-1">
            {familyTrees.length} of {userPlan.maxTrees} trees created
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="font-medium">{userPlan.type} Plan</p>
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent>{userPlan.price}/month</TooltipContent>
          </Tooltip>

          <Dialog
            open={createTreeDialogOpen}
            onOpenChange={setCreateTreeDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                className="flex items-center gap-2"
                disabled={familyTrees.length >= userPlan.maxTrees}
              >
                <Plus size={20} />
                New Tree
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Tree</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createNewTree();
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
        </div>
      </div>

      {familyTrees.length === 0 ? (
        <Alert>
          <AlertDescription>
            You haven&apos;t created any family trees yet. Click the New Tree
            button to get started!
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyTrees.map((tree) => (
            <Card key={tree._id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="line-clamp-2">{tree.name}</CardTitle>
                  <Badge variant="outline">{tree.template}</Badge>
                </div>
                <CardDescription>
                  Last modified: {tree.lastModified}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Members</span>
                    <span>
                      {tree.memberCount} of {userPlan.maxMembers}
                    </span>
                  </div>
                  <Progress
                    value={(tree.memberCount / userPlan.maxMembers) * 100}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users size={16} />
                  <span>
                    {tree.memberCount} family member
                    {tree.memberCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between gap-2 mt-auto">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateToEdit(tree._id)}
                      >
                        <Edit size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Tree</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleExport(tree._id)}
                        disabled
                      >
                        <Download size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Export Tree</TooltipContent>
                  </Tooltip>
                </div>

                <Dialog
                  open={showDeleteDialog && selectedTree === tree._id}
                  onOpenChange={(open) => {
                    setShowDeleteDialog(open);
                    if (!open) setSelectedTree(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setSelectedTree(tree._id);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Family Tree</DialogTitle>
                    </DialogHeader>
                    <p>
                      Are you sure you want to delete{" "}
                      <strong>{tree.name}</strong>?
                    </p>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowDeleteDialog(false);
                          setSelectedTree(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          selectedTree && handleDelete(selectedTree)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
