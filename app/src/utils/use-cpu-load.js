import * as React from 'react'
import { CPULoadContext } from '../components/cpu-load-provider/cpu-load-context'

export const useCPULoad = () => React.useContext(CPULoadContext)