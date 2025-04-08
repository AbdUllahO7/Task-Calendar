import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Calendar, MapPin, LinkIcon, Edit } from "lucide-react"

export function ProfileHeader() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Product Manager</p>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            <p className="text-sm max-w-2xl">
              Product Manager with 5+ years of experience in SaaS products. Passionate about creating user-friendly
              solutions that solve real problems.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                john.doe@example.com
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Joined April 2023
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                San Francisco, CA
              </div>
              <div className="flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" />
                johndoe.com
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
