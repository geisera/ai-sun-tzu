'use client'
import { useEffect, useState } from 'react'
import { PongSpinner } from "react-spinners-kit";

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      })
      const json = await result.json()
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }
  const handleKeyDown = (event) => {
    if( event.keycode === 13 || event.which === 13 ){
      event.target.value = '';
      sendQuery()
    }
  }
  async function sendQuery() {
    if (!query) return
    setResult('')
    setLoading(true)
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(query)
      })
      const json = await result.json()
      setResult(json.data)
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }
  async function reset(event) {
    if (event.target.value != '') {
      setResult('')
    }
  }
  return (
    <main className="">
      <div className="min-h-screen relative overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          The Wisdom of Niccolo Machiavelli
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          Machiavelli&apos;s ancient treatise transcends its Florentine origins. Its wisdom overflows the realms of politics, and make of it a guide for mastering your competition in any domain.
        </p>
        <div className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          <div className="mb-5">
            <input 
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 mx-2 my-2 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              onChange={e => setQuery(e.target.value)}
              tabIndex={0} 
              onKeyDown={e => handleKeyDown(e)}
              onSelect={e => reset(e)}/>

            <button 
              className="flex-none rounded-md bg-white mx-2 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" 
              onClick={sendQuery}
            > Ask Machiavelli
            </button>
          </div>
          <div className="mx-auto mt-2 max-w-xl text-left text-lg leading-8 text-gray-300">
            {
              query && <h4 
              className='
                mx-auto 
                mb-3
                max-w-2xl 
                text-center 
                text-xl 
                font-bold 
                tracking-tight 
                text-white 
                sm:text-4xl'
                >{ query }</h4>
            }
            {
              result && <p 
              className='
              mx-auto 
              mb-3
              max-w-2xl 
              text-center 
              text-xl 
              font-bold 
              tracking-tight 
              text-white 
              sm:text-4xl'>{ result }</p>
            }
            <div className='flex justify-center mt-20'>
            { 
              <PongSpinner size={60} color="#ffffff" loading={loading} />
            }
            </div>
            {/* consider removing this button from the UI once the embeddings are created ... */}
            {/*<button onClick={createIndexAndEmbeddings}>Create index and embeddings</button>*/}
          </div>
        </div>
      </div>
    </main>
  )
}
// 'use client'
// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
//   { name: 'Reports', href: '#', current: false },
// ]
// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Example() {
//   return (
//     <>
//       {/*
//         This example requires updating your template:

//         ```
//         <html class="h-full bg-gray-100">
//         <body class="h-full">
//         ```
//       */}
//       <div className="min-h-full">
//         <div className="bg-gray-800 pb-32">
//           <Disclosure as="nav" className="bg-gray-800">
//             {({ open }) => (
//               <>
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                   <div className="border-b border-gray-700">
//                     <div className="flex h-16 items-center justify-between px-4 sm:px-0">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                           <img
//                             className="h-8 w-8"
//                             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                             alt="Your Company"
//                           />
//                         </div>
//                         <div className="hidden md:block">
//                           <div className="ml-10 flex items-baseline space-x-4">
//                             {navigation.map((item) => (
//                               <a
//                                 key={item.name}
//                                 href={item.href}
//                                 className={classNames(
//                                   item.current
//                                     ? 'bg-gray-900 text-white'
//                                     : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                   'rounded-md px-3 py-2 text-sm font-medium'
//                                 )}
//                                 aria-current={item.current ? 'page' : undefined}
//                               >
//                                 {item.name}
//                               </a>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="hidden md:block">
//                         <div className="ml-4 flex items-center md:ml-6">
//                           <button
//                             type="button"
//                             className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                           >
//                             <span className="absolute -inset-1.5" />
//                             <span className="sr-only">View notifications</span>
//                             <BellIcon className="h-6 w-6" aria-hidden="true" />
//                           </button>

//                           {/* Profile dropdown */}
//                           <Menu as="div" className="relative ml-3">
//                             <div>
//                               <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                                 <span className="absolute -inset-1.5" />
//                                 <span className="sr-only">Open user menu</span>
//                                 <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
//                               </Menu.Button>
//                             </div>
//                             <Transition
//                               as={Fragment}
//                               enter="transition ease-out duration-100"
//                               enterFrom="transform opacity-0 scale-95"
//                               enterTo="transform opacity-100 scale-100"
//                               leave="transition ease-in duration-75"
//                               leaveFrom="transform opacity-100 scale-100"
//                               leaveTo="transform opacity-0 scale-95"
//                             >
//                               <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                                 {userNavigation.map((item) => (
//                                   <Menu.Item key={item.name}>
//                                     {({ active }) => (
//                                       <a
//                                         href={item.href}
//                                         className={classNames(
//                                           active ? 'bg-gray-100' : '',
//                                           'block px-4 py-2 text-sm text-gray-700'
//                                         )}
//                                       >
//                                         {item.name}
//                                       </a>
//                                     )}
//                                   </Menu.Item>
//                                 ))}
//                               </Menu.Items>
//                             </Transition>
//                           </Menu>
//                         </div>
//                       </div>
//                       <div className="-mr-2 flex md:hidden">
//                         {/* Mobile menu button */}
//                         <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                           <span className="absolute -inset-0.5" />
//                           <span className="sr-only">Open main menu</span>
//                           {open ? (
//                             <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                           ) : (
//                             <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                           )}
//                         </Disclosure.Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <Disclosure.Panel className="border-b border-gray-700 md:hidden">
//                   <div className="space-y-1 px-2 py-3 sm:px-3">
//                     {navigation.map((item) => (
//                       <Disclosure.Button
//                         key={item.name}
//                         as="a"
//                         href={item.href}
//                         className={classNames(
//                           item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                           'block rounded-md px-3 py-2 text-base font-medium'
//                         )}
//                         aria-current={item.current ? 'page' : undefined}
//                       >
//                         {item.name}
//                       </Disclosure.Button>
//                     ))}
//                   </div>
//                   <div className="border-t border-gray-700 pb-3 pt-4">
//                     <div className="flex items-center px-5">
//                       <div className="flex-shrink-0">
//                         <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
//                       </div>
//                       <div className="ml-3">
//                         <div className="text-base font-medium leading-none text-white">{user.name}</div>
//                         <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
//                       </div>
//                       <button
//                         type="button"
//                         className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                       >
//                         <span className="absolute -inset-1.5" />
//                         <span className="sr-only">View notifications</span>
//                         <BellIcon className="h-6 w-6" aria-hidden="true" />
//                       </button>
//                     </div>
//                     <div className="mt-3 space-y-1 px-2">
//                       {userNavigation.map((item) => (
//                         <Disclosure.Button
//                           key={item.name}
//                           as="a"
//                           href={item.href}
//                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
//                         >
//                           {item.name}
//                         </Disclosure.Button>
//                       ))}
//                     </div>
//                   </div>
//                 </Disclosure.Panel>
//               </>
//             )}
//           </Disclosure>
//           <header className="py-10">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
//             </div>
//           </header>
//         </div>

//         <main className="-mt-32">
//           <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
//             <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">{/* Your content */}</div>
//           </div>
//         </main>
//       </div>
//     </>
//   )
// }


