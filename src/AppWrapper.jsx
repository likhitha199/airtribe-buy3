import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
function AppWrapper() {
  return (
    <main>
      <section>
        <Outlet context={2} />
      </section>
    </main>
  )
}

export default AppWrapper
