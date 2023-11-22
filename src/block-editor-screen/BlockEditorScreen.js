/**
 * External Dependencies.
 */
const { registerPlugin } = window.wp.plugins;
const { editPost: {
    PluginSidebar,
    PluginSidebarMoreMenuItem,
    PluginPostPublishPanel,
}, element: {
    Fragment
}, i18n } = window.wp;

// Temporary Hack.
const AppIcon = () => {
    return (
        <div className="mayawp-test">
            <p>MayaWP AI</p>
        </div>
    )
}

export default class BlockEditorScreen {
    setup() {
        // getStore()
        // this.registerSlots = this.registerSlots.bind( this )
        // addAction( 'rank_math_loaded', 'rank-math', this.registerSlots, 0 )

        this.registerSidebar()
        // this.registerPostPublish()
        // this.registerPrimaryTermSelector()
    }

    /**
     * Register slots.
     */
    // registerSlots() {
    //     this.RankMathAfterEditor = RankMathAfterEditor
    //     this.RankMathAfterFocusKeyword = RankMathAfterFocusKeyword
    //     this.RankMathAdvancedTab = RankMathAdvancedTab
    //     this.slots = {
    //         AfterEditor: RankMathAfterEditor,
    //         AfterFocusKeyword: RankMathAfterFocusKeyword,
    //         AdvancedTab: RankMathAdvancedTab,
    //     }
    // }

    /**
     * Register plugin sidebar into gutenberg editor.
     */
    registerSidebar() {
        const MayaWPSidebar = () => (
            <Fragment>
                <PluginSidebarMoreMenuItem
                    target="mayawp-sidebar"
                    icon={ <AppIcon /> }
                >
                    { i18n.__( 'MayaWP AI', 'mayawp' ) }
                </PluginSidebarMoreMenuItem>
                <PluginSidebar
                    name="mayawp-sidebar"
                    title={ i18n.__( 'MayaWP AI', 'mayawp' ) }
                    className="mayawp-sidebar-panel"
                >
                    {
                        /* Filter to include components from the common editor file */
                        // applyFilters( 'rank_math_app', {} )()
                    }
                    <p>Hellooo</p>
                </PluginSidebar>
            </Fragment>
        )

        registerPlugin( 'mayawp', {
            icon: <AppIcon />,
            render: MayaWPSidebar,
        } )
    }

    // registerPostPublish() {
    //     const PostStatus = () => (
    //         <PluginPostPublishPanel
    //             initialOpen={ true }
    //             title={ i18n.__( 'Rank Math', 'rank-math' ) }
    //             className="rank-math-post-publish"
    //             icon={ <Fragment /> }
    //         >
    //             <PostPublish />
    //         </PluginPostPublishPanel>
    //     )
    //
    //     registerPlugin( 'rank-math-post-publish', {
    //         render: PostStatus,
    //     } )
    // }

    // registerPrimaryTermSelector() {
    //     addFilter(
    //         'editor.PostTaxonomyType',
    //         'rank-math',
    //         ( PostTaxonomies ) => ( props ) => (
    //             <PrimaryTermSelector
    //                 TermComponent={ PostTaxonomies }
    //                 { ...props }
    //             />
    //         )
    //     )
    // }
    // updatePermalink( slug ) {
    //     dispatch( 'core/editor' ).editPost( { slug } )
    // }
    //
    // updatePermalinkSanitize( slug ) {
    //     slug = this.assessor.getResearch( 'slugify' )( slug )
    //     dispatch( 'core/editor' ).editPost( { slug } )
    // }
}