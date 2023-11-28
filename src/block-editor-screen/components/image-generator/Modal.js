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
import { fetchImage } from "../../api/local";
import ModalLayout from "../layouts/ModalLayout";

const GeneratorModal = ({ isOpen, toggleModal }) => {

    const [state, setState] = useState({
        textInput: '',
        size: '1280x720',
        choices: [],
        isLoading: false
    });

    const generateImage = (data = {}, foreGenerate = false) => {
        setState({...state, isLoading: true});

        // fetchTitles(data, foreGenerate).then(res => {
        //     if (res.success && res?.data) {
        //         const data = JSON.parse(res?.data);
        //         data.titles.length > 0 ? setChoices(data.titles) : false;
        //         foreGenerate && toast.success( 'Titles generated' );
        //     } else if ( !res?.data ) {
        //         toast.error('Oops! failed to generate, please try again');
        //     }
        //     setIsLoading(false);
        // });
    }

    useEffect(() => {
        // Fetch last generated titles.
        generateImage();
    }, []);

    const handleTextInput = (event) => {
        setState({...state, textInput: event});
    }

    const handleImageGenerate = () => {

        if ( !state.textInput ) {
            toast('Please provide an input!');
            return;
        }

        const data = {
            text_input: state.textInput,
        }

        generateImage(data, true);
    }

    const uploadImage = ( img ) => {
        toast.success('Imported image to Media Gallery!');
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
                    placeholder='e.g. A beautiful of cat pixar style.'
                    help={<>{__(
                        'Generate images with AI and have them uploaded to your site media gallery.',
                        'mayawp'
                    )}
                    </>}
                    disabled={state.isLoading}
                />

                <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Button
                        variant="primary"
                        onClick={handleImageGenerate}
                    >
                        { __( 'Generate Now', 'mayawp' ) }
                    </Button>
                    <SelectControl
                        label="Resolution"
                        value={state.size}
                        options={ [
                            { label: '1280x720', value: '1280x720' },
                            { label: '512x512', value: '512x512' },
                            { label: '1024x1024', value: '1024x1024' },
                        ] }
                    />
                </div>
            </div>

            { state.isLoading && <div style={{
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
    </ModalLayout>
}

export default GeneratorModal;