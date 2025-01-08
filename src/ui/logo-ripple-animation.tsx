import Image from 'next/image'
import { Fragment } from 'react'

export default function LogoRippleAnimation() {
  return (
    <Fragment>
      <div className="logo-ripple-animation smart-animation smart-animation-visible">
        <Image
          src="/images/logo-animation.png"
          alt="ripple-animation"
          width={1254}
          height={1729}
          className="lazy-image lazy-image-loaded smart-background object-cover"
        />

        <div className="lazy-background-image lazy-background-image-maskImage lazy-background-image-loaded smart-line spotlight-background">
          <div></div>
          <div></div>
        </div>

        <div className="smart-circle smart-circle-1"></div>
        <div className="smart-circle smart-circle-2"></div>
      </div>

      <div className="lazy-video octopus smart-octopus">
        <Image
          src="/images/minastik-full-ver.png"
          alt="ripple-animation"
          width={1254}
          height={1729}
          className="w-full h-full"
        />
      </div>
    </Fragment>
  )
}
