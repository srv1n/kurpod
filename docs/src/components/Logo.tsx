import Image from 'next/image'
import tortoiseLogo from '../images/tortoise.png'


export function Logomark(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" fill="none" {...props}>
      <Image
        src={tortoiseLogo}
        alt="Kurpod Logo"

        className="w-full h-full object-contain"
      />
    </svg>
  )
}



export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="flex items-center gap-4" {...props}>
      <div className="w-16 h-16 flex-shrink-0">
      
        <span className="text-xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
          Kurpod
        </span>
      </div>
     
    </div>
  )
}