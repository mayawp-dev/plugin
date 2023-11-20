/**
 * External dependencies.
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { showPromiseToast } from '../../../utils';
import { fetchOptions, saveOptions } from '../../../api/settings';
import SettingsLayout from '../../layout/SettingsLayout';
import { SettingsCard, RadioSelectInput, MultiSelectInput, SelectInput, TextInput, ToggleInput } from '../../templates';

const GeneralSettings = () => {

    const [processing, setProcessing] = useState(true);

    const [options, setOptions] = useState({
        "api-key": "",
    });

    const updateOption = ( value, id ) => {
        setOptions({...options, [id]: value });
    }

    const onSave = () => {
        if ( !processing ) {
            const res = saveOptions( { options } );
            showPromiseToast( res, '', 'Settings updated!' );
        }
    }

    useEffect( () => {
        const updateOptions = ( settings ) => setOptions({ ...options, ...settings });
        const res = fetchOptions( { updateOptions } ).then( res => setProcessing(false) );

        showPromiseToast(res);
    }, []);

    return (
        <SettingsLayout>
            <SettingsCard
                title="Activate MayaWP"
                description="Enter your MayaWP account API key to enable features on this site."
                onSave={onSave}
            >
                <TextInput
                    id="api-key"
                    label="API Key"
                    type="password"
                    description={<p>You can get an API Key for free by creating an account on our <a className="underline text-blue-600 hover:no-underline" href="https://app.mayawp.com/register" target="_blank">site here</a>.</p>}
                    value={options["api-key"]}
                    placeholder="Your API key goes here"
                    setOption={updateOption}
                    disabled={processing}
                />
            </SettingsCard>
        </SettingsLayout>
    )
}

export default GeneralSettings;