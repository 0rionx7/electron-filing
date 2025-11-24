import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'

import Welcome from '@renderer/components/routingFlow/Welcome'
import PersonalInfo from '@renderer/components/routingFlow/PersonalInfo'
import FlowControl from '@renderer/components/routingFlow/FlowControl'
import FirstStep from '@renderer/components/routingFlow/FirstStep'
import SecondStep from '@renderer/components/routingFlow/SecondStep'
import ThirdStep from '@renderer/components/routingFlow/ThirdStep'
import App from './App'
import './assets/main.css'

type Step = Record<string, () => React.JSX.Element>
type RoutingMap = Record<string, Step[]>

export const routingMap: RoutingMap = {
  base: [{ index: Welcome }, { personalInfo: PersonalInfo }, { flowControl: FlowControl }],
  flow1: [{ f1step1: FirstStep }, { f1step2: SecondStep }, { f1step3: ThirdStep }],
  flow2: [{ f2step1: FirstStep }, { f2step2: SecondStep }, { f2step3: ThirdStep }],
  flow3: [{ f3step1: FirstStep }, { f3step2: SecondStep }, { f3step3: ThirdStep }]
  // flow4: [{ f4step1: FirstStep }, { f4step2: SecondStep }, { f4step3: ThirdStep }],
  // flow5: [{ f5step1: FirstStep }, { f5step2: SecondStep }, { f5step3: ThirdStep }]
}

const mapToRoute = (step: Step): React.JSX.Element[] => {
  return Object.entries(step).map(([path, Component]) =>
    path === 'index' ? (
      <Route index element={<Component />} key={path} />
    ) : (
      <Route path={path} element={<Component />} key={path} />
    )
  )
}

const routes = (
  <Route path="/" element={<App />}>
    {Object.entries(routingMap).map(([flow, steps]) => {
      if (flow === 'base') return steps.map(mapToRoute)
      return (
        <Route path={flow} key={flow}>
          {steps.map(mapToRoute)}
        </Route>
      )
    })}
  </Route>
)

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<App />}>
//         <Route index element={<Welcome />} />
//         <Route path="personalInfo" element={<PersonalInfo />} />
//         <Route path="flowControl" element={<FlowControl />} />
//         <Route path="flow1">
//           <Route path="f1step1" element={<FirstStep />} />
//           <Route path="f1step2" element={<SecondStep />} />
//           <Route path="f1step3" element={<ThirdStep />} />
//         </Route>
//         <Route path="flow2">
//           <Route path="f2step1" element={<FirstStep />} />
//           <Route path="f2step2" element={<SecondStep />} />
//           <Route path="f2step3" element={<ThirdStep />} />
//         </Route>
//         <Route path="flow3">
//           <Route path="f3step1" element={<FirstStep />} />
//           <Route path="f3step2" element={<SecondStep />} />
//           <Route path="f3step3" element={<ThirdStep />} />
//         </Route>
//       </Route>
//     </>
//   )
// )

const router = createBrowserRouter(createRoutesFromElements(routes))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
