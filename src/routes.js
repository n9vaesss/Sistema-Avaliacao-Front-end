import React from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Login from './pages/Login';
import Principal from './pages/Principal';
import Auto from './pages/Auto';
import PreAvaliacao from './pages/PreAvaliacao';
import AvaliacaoSuperior from './pages/AvaliacaoSuperior';
import PreComissao from './pages/PreComissao';
import Comissao from './pages/Comissao';
import PainelInsert from './pages/PainelInsert';
import PrePainelAtt from './pages/PrePainelAtt';
import EscolhaADM from './pages/EscolhaADM';
import PainelAtt from './pages/PainelAtt';
import PreRelatorioFinal from './pages/PreRelatorioFinal';
import RelatorioFinal from './pages/RelatorioFinal';

function routes(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/principal" element={<Principal />} />
                    <Route path="/auto" element={<Auto />} />
                    <Route path="/preavaliacao" element={<PreAvaliacao />} />
                    <Route path="/avaliacao" element={<AvaliacaoSuperior />} />
                    <Route path="/precomissao" element={<PreComissao />} />
                    <Route path="/comissao" element={<Comissao />} />
                    <Route path="/escolha" element={<EscolhaADM />} />
                    <Route path="/prepainel" element={<PrePainelAtt />} />
                    <Route path="/painelInsert" element={<PainelInsert />} />
                    <Route path="/prepainel/painelatt" element={<PainelAtt />} />
                    <Route path="/prerelatorio" element={<PreRelatorioFinal />} />
                    <Route path="/relatoriofinal" element={<RelatorioFinal />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default routes;