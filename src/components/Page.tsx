import Historico from './Main/Cam-Section'
import Condiciones from './Main/Condiciones'
import Temperatura from './Main/Temperatura'

function Page() {
  // A45248

  return (
    <main className=' bg-[#f1f1f1] h-[100%] p-5'>

      {/* Contenedor de informacion */}
      <div className='flex h-[100%] bg-white shadow-md rounded-xl'>
        <aside className=' w-[25%] bg-[#23415b] rounded-lg text-white p-5 '>
          <Temperatura />
        </aside>
        <section className=' block w-[100%]  p-5'>
          <Historico />
          <Condiciones />
        </section>
      </div>
    </main>
  )
}

export default Page
