import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Heart, Trophy } from "lucide-react"
import Image from "next/image"

export function FeaturedSection() {
  const features = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Premium Quality",
      description: "Hand-selected leeks with maximum spin potential",
      image: "/images/quality-badge.png",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Lightning Fast",
      description: "Same-day shipping for all spinning emergencies",
      image: "/images/fast-shipping.png",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Meme Approved",
      description: "Certified by the International Meme Council",
      image: "/images/meme-certified.png",
    },
    {
      icon: <Trophy className="w-8 h-8 text-green-500" />,
      title: "Award Winning",
      description: "Best Leek Shop 2024 - Internet Choice Awards",
      image: "/images/award-trophy.png",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">

      <div className="flex justify-center items-center mb-12 hover:scale-105">
        <Image
          src={"/images/leek-clean.png"}
          width={400}
          height={400}
          alt={"Leek"}
          className="object-contain animate-spin duration-1000 transition-transform p-2"
        />
      </div>


      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">Why Choose LeekShop?</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Ultimate Leek Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We&apos;re not just selling leeks - we&apos;re delivering joy, memes, and the finest spinning vegetables on
            the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
