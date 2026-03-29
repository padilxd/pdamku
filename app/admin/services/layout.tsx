import AdminSidebar from "@/components/adminsidebar"

export const metadata = {
   title: 'Admin Services - PDAM Malang',
   description: 'Praktikum SMK Telkom Malang',
}


type PropsLayout = {
   children: React.ReactNode
}


const RootLayout = ({ children }: PropsLayout) => {
   return (
       <div>
      <AdminSidebar >
                     {children}
                      </AdminSidebar>
      
         
        </div>
   )
}


export default RootLayout