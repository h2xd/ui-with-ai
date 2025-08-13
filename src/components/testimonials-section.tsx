import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "SpinMaster2024",
      avatar: "🥬",
      rating: 5,
      text: "Best leeks I've ever spun! The Classic Spinning Leek changed my life. Now I can't stop spinning!",
      product: "Classic Spinning Leek",
    },
    {
      name: "MemeQueen",
      avatar: "👑",
      rating: 5,
      text: "The leek plushie is SO CUTE! My friends are jealous of my leek collection. 10/10 would recommend!",
      product: "Leek Plushie",
    },
    {
      name: "VeggieEnthusiast",
      avatar: "🌱",
      rating: 5,
      text: "Finally, a shop that understands my love for both vegetables AND memes. The quality is amazing!",
      product: "Premium Organic Leek",
    },
    {
      name: "InternetLegend",
      avatar: "🎵",
      rating: 5,
      text: "The music box plays the leek spin song perfectly! It's now the centerpiece of my meme collection.",
      product: "Leek Spin Music Box",
    },
  ]

  return (
    <section className="py-16 px-4 bg-green-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it - hear from the leek lovers who've joined our spinning community!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-3">
                    <AvatarFallback className="text-lg">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">"{testimonial.text}"</p>
                <p className="text-xs text-green-600 font-medium">Purchased: {testimonial.product}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
