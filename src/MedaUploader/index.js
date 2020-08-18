import React from 'react';
import { MedaProvider } from './State/MedaContext'
import MedaUploader from './MedaUploader';

let MedaIndex = () => (
	<MedaProvider>
		<MedaUploader />
	</MedaProvider>
)

export default MedaIndex