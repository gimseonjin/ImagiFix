import { UserButton } from "@clerk/nextjs"

const Home = async () => {

  return (
      <>
      <h1>
          Unleash Your Creative Vision with ImagiFix
      </h1>
          <UserButton afterSignOutUrl="/" />
      </>
  )
}

export default Home