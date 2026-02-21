import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNUmber } from "@/lib/formatters";

async function getSalesData(){
    const data = await db.order.aggregate({
        _sum: {pricePaidInCents: true},
        _count: true
    })
    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}
async function getUserData(){
    const [userCount, orderData] = await Promise.all([
            db.user.count(),
            db.order.aggregate({
            _sum:{ pricePaidInCents:true}
        }),
        ])
        return {
            userCount,
            averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
        }
    }


export default async function AdminDashboard(){
    const salesData = await getSalesData()
    return (    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard 
                title="Sales" 
                subtitle={`${formatNUmber(salesData.numberOfSales)} Order`} 
                body={formatCurrency(salesData.amount)}
            />
            <DashboardCard 
                title="Customers" 
                subtitle={`${formatCurrency()} Average Value`} 
                body={formatNUmber()}
            />
            
        </div>
    )
  
  
}
type DashboardCardProps = {
    title: String
    subtitle: string
    body: string
}

function DashboardCard({title, subtitle, body}: DashboardCardProps){
    return (
        <Card>
                <CardHeader>
                   <CardTitle>{title}</CardTitle> 
                   <CardDescription>{subtitle}</CardDescription>
                </CardHeader>
                
                <CardContent>
                    <p>{body}</p>
                </CardContent>
            </Card>
    )
}