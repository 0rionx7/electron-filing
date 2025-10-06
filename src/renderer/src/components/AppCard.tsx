import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'

type AppCardProps = React.PropsWithChildren<{
  title: string
  description: string
}>

const AppCard = ({ title, description, children }: AppCardProps): React.JSX.Element => {
  return (
    <Card className="bg-transparent space-y-2.5 w-xl shadow-black shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5">{children}</CardContent>
    </Card>
  )
}

export default AppCard
