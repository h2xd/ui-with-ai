import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Zap, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-green-50 to-background">
        <div className="container max-w-4xl mx-auto">
          <div className="text-6xl mb-6">🥬</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-800">About LeekShop</h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Born from the depths of internet culture, LeekShop is your one-stop destination for all things leek. We're
            not just a shop - we're a celebration of memes, vegetables, and the beautiful chaos of the internet.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                It all started with a simple spinning leek. You know the one - that iconic green vegetable that captured
                the hearts of internet users worldwide. What began as a humble meme became something much more: a symbol
                of joy, simplicity, and the power of shared digital culture.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                In 2024, a group of meme enthusiasts and vegetable lovers came together with a wild idea: "What if we
                could bring the magic of leek memes into the real world?" And thus, LeekShop was born - a place where
                internet culture meets commerce, where spinning vegetables become lifestyle products, and where everyone
                can embrace their inner leek.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we're proud to serve thousands of customers worldwide, spreading leek joy one product at a time.
                From our classic spinning leeks to our premium golden trophies, every item in our catalog is designed
                with love, humor, and a deep appreciation for the beautiful absurdity of internet culture.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Heart className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Meme Love</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We celebrate internet culture and the joy that memes bring to our daily lives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every product is crafted with care, from our premium organic leeks to our collectible items.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're building a global community of leek lovers and meme enthusiasts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We source our fresh leeks responsibly and use eco-friendly packaging whenever possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🥬</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Leek McSpinface</h3>
                <Badge variant="outline" className="mb-3">
                  CEO & Chief Meme Officer
                </Badge>
                <p className="text-muted-foreground text-sm">
                  The original leek spinner who started it all. Passionate about vegetables and viral content.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Veggie Rodriguez</h3>
                <Badge variant="outline" className="mb-3">
                  Head of Product
                </Badge>
                <p className="text-muted-foreground text-sm">
                  Expert in vegetable quality and meme merchandise. Ensures every product meets our high standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎵</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Melody Spinner</h3>
                <Badge variant="outline" className="mb-3">
                  Community Manager
                </Badge>
                <p className="text-muted-foreground text-sm">
                  Keeps our community spinning with joy. Manages social media and customer happiness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">LeekShop by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1M+</div>
              <div className="text-muted-foreground">Leeks Spun</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">21</div>
              <div className="text-muted-foreground">Unique Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">∞</div>
              <div className="text-muted-foreground">Meme Potential</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
