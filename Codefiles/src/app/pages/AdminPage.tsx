import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { stocks } from "../data/mockData";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function AdminPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    price: "",
    marketCap: "",
  });

  const handleAddStock = () => {
    toast.success("Stock added successfully!");
    setIsAddDialogOpen(false);
    setFormData({ symbol: "", name: "", price: "", marketCap: "" });
  };

  const handleEditStock = (stock: any) => {
    setSelectedStock(stock);
    setFormData({
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price.toString(),
      marketCap: stock.marketCap,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateStock = () => {
    toast.success("Stock updated successfully!");
    setIsEditDialogOpen(false);
    setFormData({ symbol: "", name: "", price: "", marketCap: "" });
  };

  const handleDeleteStock = (stock: any) => {
    toast.success(`${stock.symbol} deleted successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage stocks and platform settings</p>
        </div>
        <Button
          className="bg-[#2563EB] hover:bg-[#1d4ed8]"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stock
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Market Cap</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell className="font-mono font-medium">{stock.symbol}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{stock.marketCap}</TableCell>
                    <TableCell className="text-right">{stock.volume}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditStock(stock)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteStock(stock)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Stock Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Stock</DialogTitle>
            <DialogDescription>
              Enter the details of the new stock to add to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-symbol">Symbol</Label>
              <Input
                id="add-symbol"
                placeholder="AAPL"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                className="bg-input-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-name">Company Name</Label>
              <Input
                id="add-name"
                placeholder="Apple Inc."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-input-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-price">Price</Label>
              <Input
                id="add-price"
                type="number"
                placeholder="178.25"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-input-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-marketcap">Market Cap</Label>
              <Input
                id="add-marketcap"
                placeholder="2.8T"
                value={formData.marketCap}
                onChange={(e) => setFormData({ ...formData, marketCap: e.target.value })}
                className="bg-input-background"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]" onClick={handleAddStock}>
              Add Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Stock Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Stock</DialogTitle>
            <DialogDescription>
              Update the stock details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-symbol">Symbol</Label>
              <Input
                id="edit-symbol"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                className="bg-input-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Company Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-input-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-input-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-marketcap">Market Cap</Label>
              <Input
                id="edit-marketcap"
                value={formData.marketCap}
                onChange={(e) => setFormData({ ...formData, marketCap: e.target.value })}
                className="bg-input-background"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]" onClick={handleUpdateStock}>
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
