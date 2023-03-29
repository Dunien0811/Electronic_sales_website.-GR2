import NProgress from 'nprogress'

export function startLoading() {
  return NProgress.start()
}

export function doneLoading() {
  return NProgress.done()
}


