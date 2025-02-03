import Historico from './Main/Cam-Section'
import Condiciones from './Main/Condiciones'
import SideBarConditions from './Main/SideBarConditions'
'./Main/SideBarConditions'
import TopBar from './Main/TopBar'

function Page() {

  return (
    <main className=' bg-[#f1f1f1] h-[100%] md:p-5'>

      <div className=' block md:flex h-[100%] bg-white shadow-md md:rounded-xl'>
        <section className=' block w-[80%]  md:p-5'>
          <TopBar />
          <Historico />
          <Condiciones />
        </section>
        <aside className='hidden md:block w-[25%] bg-[#23415b] rounded-lg text-white p-5 '>
          <SideBarConditions />
        </aside>
      </div>
    </main>
  )
}

export default Page
