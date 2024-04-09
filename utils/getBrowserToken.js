import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const getBrowserToken = async () => {
  const fpPromise = FingerprintJS.load({
    token: 'ELljApuNV6CuQLz91hT1',
  })
  return fpPromise.then((fp) => fp.get()).then((result) => result.visitorId)
}

export default getBrowserToken
