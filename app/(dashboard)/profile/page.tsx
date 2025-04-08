import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileActivity } from "@/components/profile/profile-activity"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-3">
          <ProfileStats />
        </div>
        <div className="md:col-span-4">
          <ProfileActivity />
        </div>
      </div>
    </div>
  )
}
