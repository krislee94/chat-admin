export const img_err = function (el, binding) {
  el.addEventListener('error', function () {
    let replaceUrl = getDefaultImgUrl(binding.arg)
    if (el.src === replaceUrl) {
      return
    }
    el.src = replaceUrl
  })
}

const getDefaultImgUrl = function (arg) {
  //员工默认头像
  if (arg === 'headerImgUrl-employee') {
    return 'https://d1ucbx8q9tuts7.cloudfront.net/im/msg/image/20230419/1645728590260789249/ffgr86b4n3p8.jpg'
  }
  //用户默认头像
  else if (arg === 'headerImgUrl-user') {
    return 'https://d1ucbx8q9tuts7.cloudfront.net/im/msg/image/20230419/1645728590260789249/dhrme9fvqjnr.jpg'
  }
  //商户默认头像
  else if (arg === 'headerImgUrl-merchant') {
    return 'https://d1ucbx8q9tuts7.cloudfront.net/im/msg/image/20230419/1645728590260789249/tuemtzwetb2v.png'
  }
}

export const unmounted_img_err = function (el) {
  el.removeEventListener('error', () => {})
}
