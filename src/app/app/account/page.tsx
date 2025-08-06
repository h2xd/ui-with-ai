"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Heart, Settings } from "lucide-react"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Manage your leek shopping experience</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Leek" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Lover" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="leek.lover@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Order #1001</CardTitle>
                    <Badge className="bg-green-600">Delivered</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Ordered on January 15, 2024</p>
                    <p>Classic Spinning Leek × 2</p>
                    <p>Leek Plushie × 1</p>
                    <p className="font-semibold">Total: $84.97</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Order #1002</CardTitle>
                    <Badge variant="outline">Processing</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Ordered on January 20, 2024</p>
                    <p>Giant Leek (2ft) × 1</p>
                    <p className="font-semibold">Total: $97.19</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  My Wishlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Leek Spin Music Box</h3>
                      <p className="text-green-600 font-bold">$49.99</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Add to Cart
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Premium Organic Leek</h3>
                      <p className="text-green-600 font-bold">$15.99</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Email Preferences</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>Order updates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>New leek arrivals</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Promotional offers</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Privacy</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>Allow personalized recommendations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Share data for leek research</span>
                    </label>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
