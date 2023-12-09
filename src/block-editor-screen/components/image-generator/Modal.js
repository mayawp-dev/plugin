/**
 * External Dependencies.
 */
import toast from 'react-hot-toast';

/**
 * WordPress dependencies.
 */
const { useState, useEffect } = window.wp.element;
const { Button, TextControl, SelectControl, Spinner } = window.wp.components;
const { __ } = window.wp.i18n;

/**
 * Internal dependencies.
 */
import { fetchImage, saveImage } from "../../api/local";
import ModalLayout from "../layouts/ModalLayout";

const GeneratorModal = ({ isOpen, toggleModal }) => {

    const [state, setState] = useState({
        textInput: '',
        size: '512x512',
        imageJSON: '',
        isLoading: false,
        isSaving: false,
    });

    const generateImage = (data = {}, foreGenerate = false) => {
        setState({...state, isLoading: true});

        fetchImage(data, foreGenerate).then(res => {
            if (res.success && res?.data) {
                const data = res?.data;
                '' !== data.imageJSON ? setState({...state, imageJSON: data.imageJSON, isLoading: false}) : false;
                foreGenerate && toast.success( 'Image generated' );
            } else if ( !res.success && res?.warning ) {
				toast.error(res.warning);
                setState({ ...state, isLoading: false });
			} else if ( !res.success && res?.error ) {
                toast.error(res.error);
                setState({ ...state, isLoading: false });
            } else {
                toast.error('Oops! failed to generate, please try again. If this continues please contact MayaWP support.');
                setState({ ...state, isLoading: false });
            }
        });
    }

    useEffect(() => {
        // Fetch last generated titles.
        generateImage();
    }, []);

    const handleTextInput = (event) => {
        setState({...state, textInput: event});
    }

	const handleSizeChange = (event) => {
        setState({...state, size: event});
    }

    const handleImageGenerate = () => {
        if ( !state.textInput ) {
            toast('Please provide an input!');
            return;
        }

        const data = {
            text_input: state.textInput,
			size: state.size
        }

        generateImage(data, true);
    }

    const handleSaveImage = () => {
        if ( !state.imageJSON ) {
            toast('Please generate an image first!');
            return;
        }

        setState({...state, isSaving: true});

        const data = {
            imageJSON: state.imageJSON,
        }

        saveImage(data).then(res => {
            if (res.success) {
                toast.success( 'Saved Image to Media Gallery!' );
            } else if ( !res.success && res?.error ) {
                toast.error(res.error);
            } else {
                toast.error('Oops, an error occurred!');
            }
            setState({...state, isSaving: false});
        });
    }

    return <ModalLayout
        title={ __( 'Image Generator', 'mayawp' ) }
        toggleModal={toggleModal}
        isOpen={isOpen}
    >
            <div>
                <TextControl
                    id="mayawp-app-img-generator-text"
                    value={state.textInput}
                    onChange={handleTextInput}
                    placeholder='e.g. A fluffy cat looking straight into the frame.'
                    help={<>{__(
                        'Generate images with AI and have them uploaded to your site media gallery.',
                        'mayawp'
                    )}
                    </>}
                    disabled={state.isLoading || state.isSaving}
                />

                <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <Button
                            variant="primary"
                            onClick={handleImageGenerate}
                            disabled={state.isLoading || state.isSaving}
                        >
                            { __( 'Generate Now', 'mayawp' ) }
                        </Button>
                        <p className="help-text" style={{
                            marginBottom: '0px',
                        }}>Min 4 credits per generation</p>
                    </div>
                    <SelectControl
                        label="Resolution"
                        value={state.size}
                        options={ [
                            { label: '256x256', value: '256x256' },
                            { label: '512x512', value: '512x512' },
                            { label: '1024x1024', value: '1024x1024' },
                            { label: '1024x1792', value: '1024x1792' },
                            { label: '1792x1024', value: '1792x1024' },
                        ] }
						onChange={handleSizeChange}
                    />
                </div>
            </div>

            {state.isLoading && <div style={{
                textAlign: 'center',
                marginTop: '50px',
            }}><Spinner
                style={{
                    height: 'calc(4px * 20)',
                    width: 'calc(4px * 20)'
                }}
            />
                <p>{__( 'Generating image...', 'mayawp' )}</p>
            </div> }

        {!state.isLoading && state.imageJSON && <div className="generated-image" style={{
            marginTop: '30px'

        }}>
            <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <p key="label" style={{
                    fontWeight: 600,
                    fontSize: '18px',
                    marginBottom: '20px',
                }}>{__( 'Recently Generated:', 'mayawp' )}</p>
                <Button
                    variant="primary"
                    onClick={handleSaveImage}
                    disabled={state.isLoading || state.isSaving}
                >
                    { __( 'Save to Media Gallery', 'mayawp' ) }
                </Button>
            </div>
            <img key="image" src={`data:image/png;base64,${state.imageJSON}`} style={{
                fontWeight: 600,
                fontSize: '18px',
                marginBottom: '20px',
                maxWidth: '100%',
            }} />
        </div>}
    </ModalLayout>
}

export default GeneratorModal;