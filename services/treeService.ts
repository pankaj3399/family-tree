// services/treeService.ts

export interface FamilyTree {
  _id: string;
  name: string;
  createdAt: string;
  memberCount: number;
  lastModified: string;
  template: string;
}

export const useTreeService = {
  async fetchTrees(): Promise<FamilyTree[]> {
    const response = await fetch("/api/trees", {
      method: "GET",
    });
    if (!response.ok) throw new Error("Failed to fetch trees");
    return response.json();
  },

  async deleteTree(id: string): Promise<void> {
    const response = await fetch(`/api/trees/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete tree");
  },

  async createTree(name?: string): Promise<FamilyTree> {
    const response = await fetch("/api/trees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Failed to create tree");
    return response.json();
  },

  async exportTree(id: string): Promise<FamilyTree> {
    const response = await fetch(`/api/trees/${id}`, {
      method: "GET",
    });
    if (!response.ok) throw new Error("Failed to export tree");
    return response.json();
  },

  generateExportFile(tree: FamilyTree): void {
    const blob = new Blob([JSON.stringify(tree, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tree.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};
