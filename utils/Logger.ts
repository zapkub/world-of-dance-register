declare global{ 
  interface Logger {
    log: (arg: string) => void
  }
}
export default {
  log: (arg) => {
    console.log(arg)
  }
}