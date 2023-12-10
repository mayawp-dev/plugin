/**
 * External Dependencies.
 */
import toast from 'react-hot-toast';

/**
 * WordPress dependencies.
 */
const { select, dispatch } = window.wp.data;
const { useState, useEffect } = window.wp.element;
const { Button, TextControl, Spinner, ToggleControl } = window.wp.components;
const { __ } = window.wp.i18n;

/**
 * Internal dependencies.
 */
import { fetchTitles } from "../../api/local";
import ModalLayout from "../layouts/ModalLayout";

const GeneratorModal = ({ isOpen, toggleModal }) => {

    const [titleInput, setTitleInput] = useState('');
    const [choices, setChoices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [withContent, setWithContent] = useState(false);


    const generateTitles = (data = {}, foreGenerate = false) => {
        setIsLoading(true);

        fetchTitles(data, foreGenerate).then(res => {
            if (res.success && res?.data) {
                const data = JSON.parse(res?.data);
                data.titles.length > 0 ? setChoices(data.titles) : false;
                foreGenerate && toast.success( 'Titles generated' );
            } else if ( !res.success && res?.warning ) {
                toast.error( res.warning );
            } else if ( !res.success && res?.error ) {
                toast.error(res.error);
            }

            setIsLoading(false);
        });
    }

    useEffect(() => {
        const title = select('core/editor').getEditedPostAttribute( 'title' );

        if ( '' !== title ) {
            setTitleInput(title);
        }

        // Fetch last generated titles.
        generateTitles();
    }, []);

    const handleTitleInput = (event) => {
        setTitleInput(event)
    }

    const handleTitleGenerate = () => {
        let content = '';

        if ( withContent ) {
            content = select('core/editor').getEditedPostAttribute('content');
        }

        if ( !titleInput && !content ) {
            toast('Please provide an input!');
            return;
        }

        const data = {
            title_input: titleInput,
            content,
            focus_keyword: ''
        }

        generateTitles(data, true);
    }

    const updatePostTitle = ( title ) => {
        if ( title && '' !== title ) {
            dispatch('core/editor').editPost({ title });
        }

        toast.success('Applied selected title!');
    }

    return <ModalLayout
        title={ __( 'Title Generator', 'mayawp' ) }
        toggleModal={toggleModal}
        isOpen={isOpen}
    >
                <div>
                    <TextControl
                        id="mayawp-app-title"
                        value={titleInput}
                        onChange={handleTitleInput}
                        placeholder='e.g. This post is for the awareness of Global Warming.'
                        help={<>{__(
                            'Generate relative titles to your content with AI or update the input above for any additional input.',
                            'mayawp'
                        )}
                            <br />
                            {__('For e.g. This post is for the awareness of Global Warming.', 'mayawp')}
                        </>}
                        disabled={isLoading}
                    />

                    <div
                        className="buttons"
                    >
                        <div>
                            <Button
                                variant="primary"
                                onClick={handleTitleGenerate}
                            >
                                { __( 'Generate Now', 'mayawp' ) }
                            </Button>
                            <p className="help-text">Min 1 credit per generation</p>
                        </div>

                        <ToggleControl
                            label="Include Content for context"
                            checked={withContent}
                            onChange={ () => setWithContent(!withContent) }
                            help="Extra 1 credit per 375 words (Max 3k words)"
                        />
                    </div>
                </div>

                {isLoading && <div style={{
                    textAlign: 'center',
                    marginTop: '50px',
                }}><Spinner
                    style={{
                        height: 'calc(4px * 20)',
                        width: 'calc(4px * 20)'
                    }}
                />
                <p>{__( 'Generating titles...', 'mayawp' )}</p>
                </div> }

                {!isLoading && Array.isArray( choices ) && choices.length > 0 && <ul className="generated-titles" style={{
                    marginTop: '30px'
                }}>
                    <li key="label" style={{
                        fontWeight: 600,
                        fontSize: '18px',
                        marginBottom: '20px',
                    }}>{__( 'Recently Generated:', 'mayawp' )}</li>
                    { choices.length && choices.map((choice, index) => <li key={index}><Button
                        variant="secondary"
                        style={{
                            width: '100%',
                        }}
                        onClick={() => updatePostTitle( choice.label )}
                    >
                        {choice.label}
                    </Button></li>)}
                </ul>}
    </ModalLayout>
}

export default GeneratorModal;