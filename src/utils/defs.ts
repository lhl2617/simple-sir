import { SIR } from '../components/Models/SIR';
import { SIS } from '../components/Models/SIS';
import { SIRD } from '../components/Models/SIRD';
import { MSIR } from '../components/Models/MSIR';

export const modelKeys = [`SIR`, `SIS`, `SIRD`, `MSIR`, `SEIR`, `SEIS`, `MSEIR`, `MSEIRS`];

export const modelComponentMap = {
    SIR: SIR,
    SIS: SIS,
    SIRD: SIRD,
    MSIR: MSIR,
    SEIR: SIR,
    SEIS: SIR,
    MSEIR: SIR,
    MSEIRS: SIR,
}