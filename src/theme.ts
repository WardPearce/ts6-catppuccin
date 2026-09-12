import postcss, { type Declaration, type Rule } from "postcss";

import {
  ACCENTS,
  FLAVORS,
  hexToRgbString,
  rgb,
  mix,
  type AccentId,
  type Flavor,
  type FlavorId,
} from "./palette.ts";

type Decl = readonly [prop: string, value: string];

interface StaticRule {
  sel: string;
  decls: readonly Decl[];
}

const r = (sel: string, decls: readonly Decl[]): StaticRule => ({ sel, decls });

const INPUT_RULES: readonly StaticRule[] = [
  r(".ts-input-wrapper", [
    ["background-color", "var(--teamspeak-dark-bg-tertiary) !important"],
    ["border", "1px solid var(--teamspeak-border-color) !important"],
    ["border-radius", "3px !important"],
    ["padding", "6px 8px !important"],
    ["display", "flex"],
    ["align-items", "center"],
  ]),
  r(".ts-input-wrapper input, .ts-input-wrapper textarea", [
    ["background", "transparent !important"],
    ["border", "none !important"],
    ["color", "var(--teamspeak-text-primary) !important"],
    ["width", "100% !important"],
    ["margin", "0 !important"],
    ["outline", "none !important"],
  ]),
  r(
    ".ts-input-wrapper:focus-within, .ts-input-wrapper.focus, .ts-input-wrapper:hover",
    [
      ["border-color", "var(--teamspeak-blue) !important"],
      ["box-shadow", "0 0 0 1px var(--teamspeak-blue-transparent) !important"],
    ],
  ),
  r(".tsv-search-bar", [
    ["background-color", "var(--teamspeak-dark-bg-secondary) !important"],
    ["border-radius", "var(--tsv-border-radius) !important"],
    ["border", "1px solid var(--teamspeak-border-color) !important"],
    ["padding", "4px 8px !important"],
  ]),
  r(".tsv-search-bar input", [
    ["background-color", "transparent !important"],
    ["color", "var(--teamspeak-text-primary) !important"],
    ["border", "none !important"],
  ]),
  r(
    ".tsv-search-bar:focus-within, .tsv-search-bar.focus, .tsv-search-bar:hover",
    [["border-color", "var(--teamspeak-blue) !important"]],
  ),
  r(".tsv-sidebar .tsv-search-bar", [
    ["border-radius", "var(--tsv-border-radius) !important"],
  ]),
  r(".tsv-number-picker .tsv-number-picker-field input", [
    ["border-radius", "var(--tsv-border-radius) !important"],
  ]),
];

const BUTTON_RULES: readonly StaticRule[] = [
  r(
    ".tsv-button-filled, .tsv-button-gray, .tsv-tool-button.filled, .tsv-button.tsv-button-large, .tsv-tool-buttons",
    [["border-radius", "var(--tsv-border-radius) !important"]],
  ),
  r(".tsv-button.tsv-button-large:hover", [
    ["color", "var(--teamspeak-text-primary) !important"],
  ]),
  r(".tsv-button-filled:hover, .tsv-button-hero:hover", [
    ["color", "var(--teamspeak-text-primary) !important"],
    ["background", "var(--tsv-button-filled-hover-bg) !important"],
  ]),
  r(".tsv-button-plain:hover", [
    ["transform", "scale(1.15) !important"],
    ["transform-origin", "50% 50% !important"],
    ["transition", "all .1s ease-out !important"],
  ]),
  r(".tsv-segmented-button svg path", [
    ["transform-origin", "50% 50%"],
    ["transition", "transform 0.1s ease-out"],
  ]),
  r(".tsv-segmented-button:hover svg path", [["transform", "scale(1.15)"]]),
  r(
    ".tsv-button.tsv-button-left-aligned.tsv-button-tinted.tsv-button-has-image:hover\n.tsv-icon-stack svg path",
    [
      ["transform", "scale(1.15)"],
      ["transform-origin", "50% 50%"],
      ["transition", "transform 0.1s ease-out"],
    ],
  ),
  r(
    ".ts-server-status-constructive-buttons .tsv-tool-button:not(:last-child)",
    [["margin-right", "10px !important"]],
  ),
  r(".tsv-button-hero", [
    ["animation", "none !important"],
    ["box-shadow", "none !important"],
  ]),
  r(".ts-toggle.checked", [
    ["border", "1px solid var(--teamspeak-blue) !important"],
  ]),
  r(".ts-toggle-inner.checked:after", [
    ["background", "var(--teamspeak-blue) !important"],
  ]),
  r(".ts-checkbox .ts-checkbox-inner .ts-checkbox-checkmark", [
    ["--tsv-icon-base", "var(--teamspeak-blue) !important"],
  ]),
  r(".ts-slider-segment-value.ts-slider-segment-value-on", [
    ["background", "var(--custom-color-slider1) !important"],
  ]),
  r(".ts-slider-segment-value.ts-slider-segment-value-off", [
    ["background", "var(--custom-color-slider2) !important"],
  ]),
];

const SIDEBAR_RULES: readonly StaticRule[] = [
  r(".tsv-sidebar .tsv-body-background", [
    ["background", "var(--teamspeak-dark-bg-tertiary) !important"],
  ]),
  r(".tsv-sidebar li:hover .tsv-icon .tsv-button svg path", [
    ["fill", "var(--teamspeak-blue) !important"],
    ["transform", "scale(1.15)"],
    ["transform-origin", "50% 50%"],
    ["transition", "all .1s ease-out"],
  ]),
  r(".tsv-sidebar li:hover .tsv-icon-server-global .tsv-icon-base-fill", [
    ["fill", "var(--teamspeak-blue) !important"],
    ["transform", "scale(1.15)"],
    ["transform-origin", "50% 50%"],
    ["transition", "all .1s ease-out"],
  ]),
  r(".tsv-sidebar .tsv-footer:not(.transparent)", [
    ["background", "var(--teamspeak-dark-bg-tertiary) !important"],
    ["border-top", "2px solid var(--teamspeak-dark-bg-primary) !important"],
  ]),
  r(".tsv-footer::before", [
    ["content", '"" !important'],
    ["display", "block !important"],
  ]),
  r("div[data-v-40fac9df] .tsv-footer::before", [
    ["border-top", "2px solid var(--teamspeak-dark-bg-secondary) !important"],
  ]),
  r(".ts-server-tree-item-background-no-image", [
    ["background", "transparent !important"],
  ]),
  r(".ts-server-tree-item-leaf.client.self", [
    ["color", "var(--teamspeak-blue)"],
    ["font-weight", "500"],
  ]),
  r(".ts-server-tree-item-groups span", [
    ["background", "var(--teamspeak-dark-bg-secondary) !important"],
  ]),
  r(".ts-server-tree-inactive-status, .ts-server-tree-active-status", [
    ["background", "var(--teamspeak-dark-bg-secondary) !important"],
  ]),
];

const CHAT_RULES: readonly StaticRule[] = [
  r(".ts-chat-input-container", [
    ["border", "1px solid var(--teamspeak-dark-bg-tertiary) !important"],
    ["background-color", "var(--teamspeak-dark-bg-tertiary) !important"],
    ["transition", "border-color 0.2s ease-in-out !important"],
    ["margin-right", "18px !important"],
  ]),
  r(".ts-chat-input-container.focus,\n.ts-chat-input-container:hover", [
    ["border-color", "var(--teamspeak-blue) !important"],
    ["background-color", "var(--teamspeak-dark-bg-tertiary) !important"],
  ]),
  r(".ts-chat-input-container-content", [["padding", "4px 8px !important"]]),
  r(
    ".ts-chat-room-event-detailed:not(.ts-currently-referencing, .apparently-people-like-huge-faces) .ts-chat-room-event-bubble",
    [
      ["padding", "0 12.5px 4px 4px !important"],
      ["box-shadow", "none !important"],
      ["margin-bottom", "1px !important"],
    ],
  ),
  r(
    ".ts-chat-room-event-detailed:not(.ts-currently-referencing, .apparently-people-like-huge-faces) .ts-chat-room-event-bubble::before",
    [["display", "none !important"]],
  ),
  r(".ts-chat-room-event-detailed .ts-chat-room-event-bubble-container", [
    ["margin-left", "45px"],
  ]),
  r(".ts-chat-room-event-timestamp-container", [
    ["display", "none !important"],
  ]),
  r(".ts-chat-room-event-bubble .ts-parsed-text-content a", [
    ["color", "var(--teamspeak-text-link) !important"],
  ]),
  r(".ts-chat-message-system-body", [
    ["border-left", "2px solid var(--teamspeak-border-color) !important"],
    ["margin", "2px 0"],
    ["padding-left", "8px"],
  ]),
  r(".ts-chat-room-event-selected .ts-chat-message-system-body:before", [
    ["background", "var(--teamspeak-blue) !important"],
    ["box-shadow", "0 0 0 1px var(--teamspeak-blue) !important"],
  ]),
  r(
    ".tsv-view.tsv-activity .ts-chat-room-event-detailed.is-system .ts-chat-message-system-body,\n.ts-activity-slideover-container .ts-chat-room-event-detailed.is-system .ts-chat-message-system-body",
    [
      ["border-radius", "var(--tsv-border-radius) !important"],
      ["border-color", "transparent !important"],
    ],
  ),
  r(".ts-chat-room-event-bubble.self-mention", [
    ["background", "var(--teamspeak-mention-self-bg) !important"],
    ["color", "var(--teamspeak-text-primary) !important"],
    ["border-left", "2px solid var(--teamspeak-blue) !important"],
    ["border-radius", "0 3px 3px 0 !important"],
    ["padding-left", "6px !important"],
  ]),
  r(".ts-chat-room-event-bubble.self-mention::before", [
    ["display", "none !important"],
  ]),
  r(".ts-chat-room-event-bubble.mention", [
    ["background", "var(--teamspeak-mention-bg) !important"],
    ["color", "var(--teamspeak-text-primary) !important"],
  ]),
  r(".tsv-virtual-list-item:hover", [
    ["background-color", "var(--teamspeak-dark-bg-primary) !important"],
  ]),
  r(
    ".tsv-body .tsv-flex-column .tsv-virtual-list-container .tsv-virtual-list-item:hover",
    [["background-color", "var(--teamspeak-dark-bg-secondary) !important"]],
  ),
  r(
    ".tsv-activities .tsv-virtual-list-item:hover,\n.tsv-item-group .tsv-virtual-list-item:hover,\n.tsv-resize-area-container .tsv-virtual-list-item:hover",
    [["background-color", "transparent !important"]],
  ),
  r(".tsv-virtual-list-item:has(.ts-chat-message-system-body):hover", [
    ["background-color", "transparent !important"],
  ]),
  r(
    ".tsv-view.tsv-activity .tsv-view.tsv-activity-detail\n  .tsv-body.tsv-flex-column.tsv-virtual-list-container\n  .tsv-virtual-list-item:hover",
    [["background-color", "var(--teamspeak-dark-bg-primary) !important"]],
  ),
  r(".ts-notifications-center", [
    ["background", "var(--teamspeak-dark-bg-primary) !important"],
  ]),
  r(
    ".ts-emoji-picker-emoji:hover,\n.ts-emoji-picker-anchor:hover,\n.ts-chat-input-tabs:hover",
    [["cursor", "pointer"]],
  ),
  r(".ts-emoji-scroll-container .tsv-virtual-list::-webkit-scrollbar-track", [
    ["background", "transparent !important"],
  ]),
  r(
    ".tsv-settings-categories.not-in-sidebar .tsv-item.tsv-selected>.tsv-item-highlight",
    [["background-color", "var(--teamspeak-dark-bg-secondary) !important"]],
  ),
  r(".ts-discovery-card:hover", [
    ["--card-background", "var(--teamspeak-dark-bg-primary) !important"],
  ]),
  r(".ts-currently-referencing .ts-chat-room-event-bubble", [
    ["background", "var(--teamspeak-dark-bg-modifier-selected) !important"],
    ["color", "var(--teamspeak-text-primary) !important"],
    ["border-left", "2px solid var(--teamspeak-text-link) !important"],
    ["border-radius", "0 3px 3px 0 !important"],
    ["padding-left", "6px !important"],
  ]),
  r(".ts-currently-referencing .ts-chat-room-event-bubble::before", [
    ["display", "none !important"],
  ]),
  r(
    ".ts-currently-referencing .ts-chat-message-attachment-footer.ts-noselect > a,\n.ts-currently-referencing .ts-reply .ts-reply-icon",
    [["color", "var(--teamspeak-text-link) !important"]],
  ),
  r(".ts-rendered-message .ts-reply .ts-reply-icon", [
    ["--tsv-icon-base", "var(--teamspeak-text-primary) !important"],
  ]),
  r(".ts-chat-message-attachment", [["margin-left", "50px"]]),
  r(
    ".ts-chat-room-event-detailed .ts-chat-message-attachment-container.ts-timestamp-margin-left,\n.ts-chat-room-event-detailed .ts-timestamp-margin-left",
    [["margin-left", "0px !important"]],
  ),
  r(".ts-chat-message-attachment-inner:has(.ts-attachment-youtube-wrapper)", [
    ["border-left", "3px solid #FF0000 !important"],
  ]),
  r(".ts-chat-message-attachment-inner", [
    ["background-color", "var(--teamspeak-dark-bg-secondary) !important"],
    ["border", "1px solid var(--teamspeak-border-color) !important"],
    ["border-radius", "3px"],
  ]),
  r(
    ".ts-chat-message-attachment .ts-chat-message-attachment-image,\n.ts-chat-message-attachment-myts-file.isImage",
    [["height", "unset !important"]],
  ),
  r(
    ".ts-chat-room-event-selected .ts-chat-message-attachment-container .ts-chat-message-attachment-inner",
    [
      ["background", "var(--teamspeak-dark-bg-modifier-selected) !important"],
      ["border-color", "var(--teamspeak-blue) !important"],
      ["--room-event-highlight-border", "var(--teamspeak-blue) !important"],
      ["--room-event-highlight-border2", "var(--teamspeak-blue) !important"],
      [
        "--room-event-highlight-bg",
        "var(--teamspeak-dark-bg-modifier-selected) !important",
      ],
      [
        "--tsv-shaded-bg-selection",
        "var(--teamspeak-dark-bg-modifier-selected) !important",
      ],
    ],
  ),
  r(".tsv-flex.tsv-flex-wrap.ts-reactions", [
    ["margin-left", "50px !important"],
  ]),
  r(".ts-parsed-text-content .spoiler:not([visible])", [
    ["background-color", "var(--teamspeak-dark-bg-tertiary) !important"],
    ["color", "transparent !important"],
    ["border-radius", "3px"],
  ]),
  r(".ts-parsed-text-content .spoiler:not([visible]):hover", [
    ["background-color", "rgba(32, 34, 37, 0.8) !important"],
  ]),
  r(
    ".ts-chat-room-event-compact.ts-chat-room-event-selected .ts-chat-message-compact-container .actual:before,\n.ts-chat-room-event-selected:before",
    [
      ["box-shadow", "none !important"],
      ["background", "var(--teamspeak-blue) !important"],
      ["border", "1px solid var(--teamspeak-text-primary)"],
      ["border-radius", "3px"],
    ],
  ),
  r(".ts-chat-quick-actions::before", [
    ["border-radius", "var(--tsv-border-radius) !important"],
  ]),
];

const WIDGET_RULES: readonly StaticRule[] = [
  r(
    ".tsv-readability.ts-widget-container > *,\n.tsv-dashboard-servers__content,\n.tsv-dashboard-chats,\n.tsv-dashboard-news",
    [["margin-bottom", "10px !important"]],
  ),
  r(
    ".tsv-readability.ts-widget-container .ts-card.ts-widget.ts-widget-break.full.no-padding.tsv-client-banner,\n.tsv-readability.ts-widget-container .ts-card.ts-widget.ts-widget-break.full.tsv-client-info-groups-container.ts-client-info-status,\n.tsv-readability.ts-widget-container .ts-card.ts-widget.ts-widget-break.full.tsv-client-info-contact-management,\n.tsv-readability.ts-widget-container .ts-card.ts-widget.ts-widget-break.full.tsv-client-info-groups-container,\n.tsv-readability.ts-widget-container .ts-card.ts-widget.ts-transfer-quota-outer.ts-widget-break",
    [["background", "var(--teamspeak-dark-bg-primary) !important"]],
  ),
  r(".ts-discovery-wrapper", [
    ["background", "var(--teamspeak-dark-bg-primary) !important"],
    ["border", "none !important"],
    ["padding", "0 !important"],
    ["margin", "0 !important"],
    ["box-shadow", "none !important"],
  ]),
];

const MISC_RULES: readonly StaticRule[] = [
  r("::-webkit-scrollbar", [
    ["width", "var(--custom-value-scrollbar-width) !important"],
    ["height", "6px !important"],
  ]),
  r("::-webkit-scrollbar-track", [
    ["background", "var(--teamspeak-scrollbar-thumb) !important"],
    ["border-radius", "3px !important"],
  ]),
  r("::-webkit-scrollbar-thumb", [
    ["background-color", "var(--teamspeak-scrollbar-track) !important"],
    ["border-radius", "3px !important"],
  ]),
  r(".ts-chunk-scroll-track__thumb", [
    ["background-color", "var(--teamspeak-scrollbar-track) !important"],
    ["border-radius", "3px !important"],
  ]),
  r(".ts-dnd-drag-into:after", [
    ["background-color", "var(--teamspeak-blue-transparent) !important"],
    ["border", "1px dashed var(--teamspeak-blue) !important"],
  ]),
  r("strong", [
    ["font-weight", "600 !important"],
    ["color", "var(--teamspeak-text-primary) !important"],
  ]),
  r(
    ".ts-server-events-list li.ts-event-cyan,\n.ts-server-logs-list li.ts-event-cyan",
    [["border-left-color", "var(--default-tsv-tint) !important"]],
  ),
  r(".ts-title-logo", [
    ["--tsv-icon-tint", "var(--teamspeak-blue) !important"],
  ]),
  r(".ts-server-informative-buttons::before", [
    ["border-radius", "var(--tsv-border-radius) !important"],
  ]),
  r(".ts-user-style-current .ts-user-style-name", [
    ["color", "var(--tsv-tint)"],
  ]),
  r(".tsv-action", [["cursor", "pointer !important"]]),
  r(".ts-account-badges-area", [["cursor", "pointer !important"]]),
  r(".setup-stream__settings.wide-mode .tsv-segmented-button.active", [
    ["background-color", "transparent !important"],
    ["box-shadow", "none"],
    ["font-weight", "bold"],
    ["transform", "scale(1.15)"],
    ["transform-origin", "50% 50%"],
  ]),
  r(".setup-stream__settings.wide-mode .tsv-segmented-button:hover", [
    ["transform", "scale(1.15)"],
    ["transform-origin", "50% 50%"],
    ["transition", "all .1s ease-out"],
  ]),
  r(
    ".tsv-view.tsv-activity-detail.tsv-activity-secondary .tsv-body.tsv-flex.tsv-body-background",
    [
      ["padding-right", "8px !important"],
      ["box-sizing", "border-box !important"],
    ],
  ),
  r(".tsv-segmented-control:not(.tsv-segmented-control-list)", [
    ["border-radius", "var(--tsv-border-radius) !important"],
  ]),
  r(
    ".ts-server-tree-item-leaf:hover .tsv-item-highlight,\n.ts-server-tree-item-leaf:hover .tsv-item-highlight-extra,\n.ts-server-tree-item-leaf.tsv-active .tsv-item-highlight,\n.ts-server-tree-item-leaf.tsv-active .tsv-item-highlight-extra,\n.ts-server-tree-item-leaf.tsv-selected .tsv-item-highlight,\n.ts-server-tree-item-leaf.tsv-selected .tsv-item-highlight-extra",
    [
      ["display", "block !important"],
      [
        "background",
        "var(--teamspeak-blue-transparent-light, rgba(50,150,255,0.3)) !important",
      ],
      ["box-shadow", "inset 0 0 0 0.5px var(--tsv-tint, #5095ff) !important"],
      ["border", "1px solid var(--tsv-tint) !important"],
      ["border-radius", "var(--tsv-border-radius) !important"],
    ],
  ),
  r(
    ".ts-server-tree-item-leaf.channel:not(.spacer).is-full .tsv-item-highlight::after,\n.ts-server-tree-item-leaf.channel:not(.spacer).is-full .tsv-item-highlight-extra::after,\n.ts-server-tree-item-leaf.channel:not(.spacer).has-password .tsv-item-highlight::after,\n.ts-server-tree-item-leaf.channel:not(.spacer).has-password .tsv-item-highlight-extra::after",
    [["border-radius", "var(--tsv-border-radius) !important"]],
  ),
  r(
    ".ts-server-tree-item-leaf .tsv-item-highlight,\n.ts-server-tree-item-leaf .tsv-item-highlight-extra,\n.ts-server-tree-item-leaf .ts-server-tree-item-background-image,\n.ts-server-tree-item-leaf .ts-server-tree-item-background-image-full,\n.ts-server-tree-item-leaf .ts-server-tree-item-background-no-image,\n.ts-server-tree-item-node .ts-expander,\n.ts-server-tree-item-node .ts-expander-spacing",
    [["border-radius", "var(--tsv-border-radius) !important"]],
  ),
  r(
    ".ts-server-tree-item-node .ts-expander,\n.ts-server-tree-item-node .ts-expander-spacing",
    [["background-color", "var(--teamspeak-dark-bg-secondary) !important"]],
  ),
  r(
    ".ts-server-tree-item-background-image img,\n.ts-server-tree-item-background-image-full img",
    [
      ["position", "absolute"],
      ["top", "50%"],
      ["left", "50%"],
      ["transform", "translate(-50%, -50%)"],
      ["width", "100% !important"],
      ["height", "auto !important"],
    ],
  ),
  r(
    ".ts-server-tree-item-background-image img,\n.ts-server-tree-item-background-image-full img,\n.ts-server-tree-item-background-no-image img",
    [["-webkit-mask-image", "none !important"]],
  ),
  r(
    ".ts-server-tree-item-leaf.channel:hover .ts-server-tree-item-background-image__img,\n.ts-server-tree-item-leaf.channel.tsv-active .ts-server-tree-item-background-image__img",
    [["margin-left", "0px !important"]],
  ),
  r(".ts-server-tree-item-leaf .ts-server-tree-item-text.banner", [
    [
      "text-shadow",
      "0 1px 3px var(--tsv-contrast-bg),\n    0 0 12px var(--tsv-contrast-bg),\n    0 0 8px var(--tsv-contrast-bg),\n    0 0 4px var(--tsv-contrast-bg)",
    ],
  ]),
  r(".tsv-header .tsv-central-toolbar-buttons::before", [
    ["border-radius", "var(--tsv-border-radius) !important"],
  ]),
  r(
    ".ts-card,\n.ts-chat-input-container-content,\n.ts-chat-input-container,\n.tsv-view-background__img,\n.ts-server-tree-active-status,\n.ts-server-tree-inactive-status,\n.multiselect,\n.ts-server-tree-item-groups span,\n.tsv-table>.tsv-table-header>.tsv-table-header-entry:not(.no-border)::after,\n.ts-breadcrumbs,\n.ts-info-files-channel-inner .tsv-files-quickinfo,\n.tsv-settings-theme-picker .tsv-settings-theme-picker-item,\n.ts-appearance-settings .ts-collection-item,\n.tsv-view-banner .tsv-view-background,\n.tsv-server-info-grid .tsv-server-info-grid-item,\n.tsv-server-info-grid .tsv-server-info-grid-left,\n.tsv-detail-info-topic .tsv-server-info-topic-banner,\n.ts-widget-container > .ts-widget:not(.transparent),\n.ts-widget-wrapper,\n.tsv-dashboard-servers__content,\n.tsv-dashboard-chats,\n.tsv-dashboard-news,\n.tsv-dashboard-widget,\n.ts-discovery-card-border:after,\n.ts-discovery-card,\n.server-spotlight-space,\n.ts-discovery-card .ts-discovery-header,\n.ts-discovery-card--sticky,\n.tsv-dashboard-chats .server-hosting > .tsv-dashboard-widget .tsv-dashboard-widget-content,\n.ts-notification::before,\n.tsv-view-banner .tsv-view-background:after",
    [["border-radius", "var(--tsv-border-radius) !important"]],
  ),
  r(".ts-appearance-settings .ts-collection-container,\n.tsv-item-accessory", [
    ["cursor", "pointer !important"],
  ]),
  r(
    ".ts-context-menu li.tsv-item svg.tsv-icon .tsv-icon-base-stroke,\n.ts-context-menu li.tsv-item svg.tsv-icon .tsv-icon-base-fill",
    [
      [
        "transition",
        "transform .1s ease-out, stroke .1s ease-out, fill .1s ease-out",
      ],
      ["transform-origin", "center"],
    ],
  ),
  r(
    ".ts-context-menu li.tsv-item:hover svg.tsv-icon:not(.tsv-icon-primary) .tsv-icon-base-stroke",
    [
      ["stroke", "var(--tsv-tint) !important"],
      ["transform", "scale(1.15)"],
    ],
  ),
  r(
    ".ts-context-menu li.tsv-item:hover svg.tsv-icon:not(.tsv-icon-primary) .tsv-icon-base-fill",
    [
      ["fill", "var(--tsv-tint) !important"],
      ["transform", "scale(1.15)"],
    ],
  ),
  r(".tsv-settings-theme-picker-item.active", [
    ["--preview-bg", "var(--teamspeak-dark-bg-tertiary) !important"],
  ]),
  r(".tsv-activity-main .tsv-header>.tsv-window-bar::after", [
    [
      "--radius",
      "var(--main-content-top-corner-radius, var(--tsv-border-radius))",
    ],
  ]),
  r(
    ".tsv-button-filled.tsv-is-destructive:hover,\n.tsv-button-hero.tsv-is-destructive:hover",
    [
      [
        "background",
        "var(--tsv-button-filled-destructive-hover-bg, #B71C1C) !important",
      ],
    ],
  ),
  r(".tsv-bar .tsv-item-content.tsv-item-content-primary", [
    ["display", "grid !important"],
    ["grid-template-columns", "auto 1fr !important"],
    ["grid-template-rows", "auto auto !important"],
    ["grid-column-gap", "var(--tsv-padding-h-small) !important"],
    ["grid-row-gap", "1px !important"],
    ["align-items", "center !important"],
    ["flex-direction", "initial !important"],
    ["flex-wrap", "initial !important"],
    ["height", "auto !important"],
  ]),
  r(".tsv-bar .tsv-item-content.tsv-item-content-primary > .tsv-icon", [
    ["grid-column", "1 / 2 !important"],
    ["grid-row", "1 / 3 !important"],
    ["align-self", "center !important"],
    ["margin-right", "0 !important"],
    ["flex-shrink", "0 !important"],
  ]),
  r(".tsv-bar .tsv-item-content.tsv-item-content-primary > .tsv-item-text", [
    ["grid-column", "2 / 3 !important"],
    ["grid-row", "1 / 2 !important"],
    ["align-self", "end !important"],
    ["display", "block !important"],
    ["width", "100% !important"],
    ["min-width", "0 !important"],
    ["margin", "0 !important"],
    ["padding", "0 !important"],
    ["flex-grow", "1 !important"],
    ["flex-shrink", "1 !important"],
  ]),
  r(
    ".tsv-bar .tsv-item-content.tsv-item-content-primary > .tsv-item-text > .tsv-text-truncate",
    [
      ["display", "block !important"],
      ["white-space", "nowrap !important"],
      ["overflow", "hidden !important"],
      ["text-overflow", "ellipsis !important"],
      ["width", "100% !important"],
    ],
  ),
  r(
    ".tsv-bar .tsv-item-content.tsv-item-content-primary > .tsv-item-text-detail",
    [
      ["grid-column", "2 / 3 !important"],
      ["grid-row", "2 / 3 !important"],
      ["align-self", "start !important"],
      ["color", "var(--tsv-font-subtitle-color) !important"],
      ["font-size", "var(--tsv-font-size-minimal) !important"],
      ["white-space", "nowrap !important"],
      ["overflow", "hidden !important"],
      ["text-overflow", "ellipsis !important"],
      ["line-height", "1.2 !important"],
      ["width", "100% !important"],
      ["min-width", "0 !important"],
      ["margin", "0 !important"],
      ["padding", "0 !important"],
      ["flex-grow", "0 !important"],
      ["flex-shrink", "1 !important"],
    ],
  ),
  r(
    ".multiselect,\n.permission-item .tsv-item,\n.tsv-tool-menu,\n.ts-context-menu:before,\n.ts-context-menu",
    [["border-radius", "var(--tsv-border-radius) !important"]],
  ),
  r(".tsv-activity-secondary .tsv-bar .tsv-segmented-control", [
    ["background-color", "var(--teamspeak-dark-bg-tertiary) !important"],
  ]),
  r(".multiselect__content-wrapper", [
    ["border-bottom-left-radius", "var(--tsv-border-radius) !important"],
    ["border-bottom-right-radius", "var(--tsv-border-radius) !important"],
  ]),
  r(".ts-slider-knob", [["cursor", "pointer !important"]]),
];

const AD_REMOVAL_RULES: readonly StaticRule[] = [
  r(
    ".ts-join-community .tsv-button-filled,\n.ts-start-community-banner,\n.ts-start-community-banner + .ts-horizontal-separator",
    [["display", "none !important"]],
  ),
];

const STATIC_RULES: readonly StaticRule[] = [
  ...INPUT_RULES,
  ...BUTTON_RULES,
  ...SIDEBAR_RULES,
  ...CHAT_RULES,
  ...WIDGET_RULES,
  ...MISC_RULES,
];

/* ==========================================================================
   Variable mapping
   ========================================================================== */

interface FlavorMapped {
  accent: { hex: string; hover: string };
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  modifierHover: string;
  modifierActive: string;
  modifierSelected: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  headerPrimary: string;
  headerSecondary: string;
  interactiveNormal: string;
  interactiveHover: string;
  interactiveActive: string;
  interactiveMuted: string;
  mentionBg: string;
  scrollbarTrack: string;
  borderColor: string;
  contextMenuSelection: string;
  deletedFontColor: string;
  secondaryFontColor: string;
  contrastFontColor: string;
}

export function mapFlavor(flavor: Flavor, accent: AccentId): FlavorMapped {
  const base = FLAVORS[flavor.id];
  const acc = flavor.accents[accent];
  return {
    accent: { hex: acc.hex, hover: mix(acc.hex, "#000000", 0.2) },
    bgPrimary: base.base.hex,
    bgSecondary: base.mantle.hex,
    bgTertiary: base.crust.hex,
    modifierHover: base.dark
      ? "rgba(255, 255, 255, 0.04)"
      : "rgba(0, 0, 0, 0.04)",
    modifierActive: base.dark
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(0, 0, 0, 0.06)",
    modifierSelected: base.dark
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(0, 0, 0, 0.08)",
    textPrimary: base.text.hex,
    textSecondary: base.subtext1.hex,
    textMuted: base.subtext0.hex,
    headerPrimary: base.text.hex,
    headerSecondary: base.subtext1.hex,
    interactiveNormal: base.subtext1.hex,
    interactiveHover: base.text.hex,
    interactiveActive: base.text.hex,
    interactiveMuted: (base.dark ? base.surface2 : base.surface1).hex,
    mentionBg: rgb(base.yellow, base.dark ? 0.05 : 0.12),
    scrollbarTrack: (base.dark ? base.subtext1 : base.surface1).hex,
    borderColor: (base.dark ? base.crust : base.surface1).hex,
    contextMenuSelection: base.dark
      ? "var(--teamspeak-dark-bg-modifier-selected)"
      : "rgba(0, 0, 0, 0.05)",
    deletedFontColor: base.red.hex,
    secondaryFontColor: base.text.hex,
    contrastFontColor: base.text.hex,
  };
}

/* ==========================================================================
   PostCSS construction
   ========================================================================== */

function sectionComment(title: string): postcss.Comment {
  return postcss.comment({
    text: ` ==========================================================================\n   ${title}\n   ========================================================================== `,
  });
}

function decl(prop: string, value: string): Declaration {
  return postcss.decl({ prop, value });
}

function buildVarRule(f: Flavor, m: FlavorMapped, accent: AccentId): Rule {
  const root = postcss.rule({ selector: ":root, ::after, ::before" });

  root.append(sectionComment("1. Core Variables (--teamspeak-*)"));
  root.append(
    decl("--teamspeak-blue", m.accent.hex),
    decl("--teamspeak-blue-hover", m.accent.hover),
    decl("--teamspeak-blue-transparent", rgb(f.accents[accent], 0.3)),
    decl("--teamspeak-blue-transparent-light", rgb(f.accents[accent], 0.1)),
    decl("--teamspeak-dark-bg-primary", m.bgPrimary),
    decl("--teamspeak-dark-bg-secondary", m.bgSecondary),
    decl("--teamspeak-dark-bg-tertiary", m.bgTertiary),
    decl("--teamspeak-dark-bg-modifier-hover", m.modifierHover),
    decl("--teamspeak-dark-bg-modifier-active", m.modifierActive),
    decl("--teamspeak-dark-bg-modifier-selected", m.modifierSelected),
    decl("--teamspeak-text-primary", m.textPrimary),
    decl("--teamspeak-text-secondary", m.textSecondary),
    decl("--teamspeak-text-muted", m.textMuted),
    decl("--teamspeak-text-link", "var(--teamspeak-blue)"),
    decl("--teamspeak-header-primary", m.headerPrimary),
    decl("--teamspeak-header-secondary", m.headerSecondary),
    decl("--teamspeak-interactive-normal", m.interactiveNormal),
    decl("--teamspeak-interactive-hover", m.interactiveHover),
    decl("--teamspeak-interactive-active", m.interactiveActive),
    decl("--teamspeak-interactive-muted", m.interactiveMuted),
    decl("--teamspeak-mention-bg", m.mentionBg),
    decl("--teamspeak-mention-self-bg", "var(--teamspeak-blue-transparent)"),
    decl("--teamspeak-scrollbar-thumb", "var(--teamspeak-dark-bg-tertiary)"),
    decl("--teamspeak-scrollbar-track", m.scrollbarTrack),
    decl("--teamspeak-border-color", m.borderColor),
  );

  root.append(
    sectionComment("2. TeamSpeak Variable Mapping (--tsv-* / --ts-*)"),
  );
  root.append(
    decl("--tsv-tint", "var(--teamspeak-blue) !important"),
    decl("--tsv-tint2", "var(--teamspeak-blue) !important"),
    decl("--tsv-bg", "var(--teamspeak-dark-bg-primary) !important"),
    decl("--tsv-shaded-bg", "var(--teamspeak-dark-bg-secondary) !important"),
    decl("--tsv-contrast-bg", "var(--teamspeak-dark-bg-tertiary) !important"),
    decl(
      "--tsv-contrast-strong-bg",
      "var(--teamspeak-dark-bg-tertiary) !important",
    ),
    decl(
      "--ts-context-menu-background",
      "var(--teamspeak-dark-bg-tertiary) !important",
    ),
    decl(
      "--tsv-chat-widget-bg",
      "var(--teamspeak-dark-bg-secondary) !important",
    ),
    decl("--tsv-deviant-bg", "var(--teamspeak-dark-bg-secondary) !important"),
    decl("--card-background", "var(--teamspeak-dark-bg-secondary) !important"),
    decl("--tsv-preview-bg", "var(--teamspeak-dark-bg-tertiary) !important"),
    decl("--strong-bg", "var(--teamspeak-dark-bg-secondary) !important"),
    decl("--ts-tree-badges-bg", "var(--teamspeak-dark-bg-tertiary) !important"),
    decl("--ts-new-header-bg", "var(--teamspeak-dark-bg-tertiary) !important"),
    decl("--tsv-header-bg", "var(--teamspeak-dark-bg-secondary) !important"),
    decl(
      "--tsv-view-header-bg",
      "var(--teamspeak-dark-bg-secondary) !important",
    ),
    decl(
      "--tsv-view-header-gradient-start",
      "var(--teamspeak-dark-bg-secondary) !important",
    ),
    decl(
      "--tsv-server-header-gradient-start",
      "var(--teamspeak-dark-bg-secondary) !important",
    ),
    decl(
      "--tsv-server-header-gradient-end",
      "var(--teamspeak-dark-bg-secondary) !important",
    ),
    decl(
      "--tsv-servertree-bg-gradient",
      "var(--teamspeak-dark-bg-primary) !important",
    ),
    decl("--tsv-chat-remote-bg", "transparent !important"),
    decl("--tsv-chat-self-bg", "transparent !important"),
    decl("--tsv-chat-deleted-bg", "transparent !important"),
    decl("--tsv-chat-deleted-font-color", m.deletedFontColor + " !important"),
    decl("--tsv-chat-link-color", "var(--teamspeak-text-link) !important"),
    decl(
      "--tsv-chat-remote-font-color",
      "var(--teamspeak-text-primary) !important",
    ),
    decl(
      "--tsv-chat-self-font-color",
      "var(--teamspeak-text-primary) !important",
    ),
    decl("--ts-chat-system-message-bg", "transparent !important"),
    decl(
      "--ts-chat-system-highlight-text-color",
      "var(--teamspeak-blue) !important",
    ),
    decl(
      "--ts-chat-system-message-color",
      "var(--teamspeak-text-muted) !important",
    ),
    decl("--tsv-button-filled-bg", "var(--teamspeak-blue) !important"),
    decl(
      "--tsv-button-filled-hover-bg",
      "var(--teamspeak-blue-hover) !important",
    ),
    decl("--tsv-font-color", "var(--teamspeak-text-primary) !important"),
    decl(
      "--tsv-font-subtitle-color",
      "var(--teamspeak-text-secondary) !important",
    ),
    decl("--ts-third-font-color", "var(--teamspeak-header-primary) !important"),
    decl("--ts-secondary-font-color", m.secondaryFontColor + " !important"),
    decl("--tsv-contrast-font-color", m.contrastFontColor + " !important"),
    decl(
      "--tsv-separation-border",
      "1px solid var(--teamspeak-border-color) !important",
    ),
    decl(
      "--horizontal-separator-color",
      "var(--teamspeak-border-color) !important",
    ),
    decl("--card-outline", "var(--teamspeak-blue) !important"),
    decl("--ts-menu-action-color", "var(--teamspeak-blue) !important"),
    decl(
      "--tsv-context-menu-item-selection",
      m.contextMenuSelection + " !important",
    ),
    decl(
      "--ts-select-arrow-color",
      "var(--teamspeak-interactive-normal) !important",
    ),
    decl(
      "--tsv-slider-track-bg",
      "var(--teamspeak-dark-bg-tertiary) !important",
    ),
    decl("--custom-color-slider1", "var(--teamspeak-blue) !important"),
    decl(
      "--custom-color-slider2",
      "var(--teamspeak-interactive-muted) !important",
    ),
    decl("--tsv-scrollbar-bg", "var(--teamspeak-scrollbar-thumb) !important"),
    decl(
      "--tsv-scrollbar-chunks--bg-1",
      "var(--teamspeak-scrollbar-track) !important",
    ),
    decl("--tsv-scrollbar-chunks--bg-2", "transparent !important"),
    decl("--custom-value-scrollbar-width", "6px"),
    decl("--tsv-client-silent--gradient-start", "transparent !important"),
    decl("--tsv-client-silent--gradient-stop", "transparent !important"),
    decl(
      "--tsv-client-talking--gradient-start",
      "var(--teamspeak-blue) !important",
    ),
    decl(
      "--tsv-client-talking--gradient-stop",
      "var(--teamspeak-blue) !important",
    ),
  );

  return root;
}

function buildStaticNodes(
  f: Flavor,
  accent: AccentId,
): (Rule | postcss.Comment)[] {
  const nodes: (Rule | postcss.Comment)[] = [];

  nodes.push(sectionComment("3. Specific Element Styling Overrides"));
  for (const rule of STATIC_RULES) {
    const node = postcss.rule({ selector: rule.sel });
    for (const [prop, value] of rule.decls) {
      node.append(decl(prop, value));
    }
    nodes.push(node);
  }

  /* The sticky discovery card uses the accent for its radial gradient. */
  const stops = [
    mix(f.accents[accent].hex, "#000000", 0.45),
    mix(f.accents[accent].hex, "#000000", 0.22),
    f.accents[accent].hex,
    mix(f.accents[accent].hex, "#ffffff", 0.35),
  ];
  const gradient = [
    "radial-gradient(circle at 0% 0%, " +
      hexToRgbString(stops[0]!) +
      " 0%, transparent 40%),",
    "radial-gradient(circle at 100% 0%, " +
      hexToRgbString(stops[1]!) +
      " 0%, transparent 40%),",
    "radial-gradient(circle at 0% 100%, " +
      hexToRgbString(stops[2]!) +
      " 0%, transparent 40%),",
    "radial-gradient(circle at 100% 100%, " +
      hexToRgbString(stops[3]!) +
      " 0%, transparent 40%)",
  ].join("\n        ");

  const sticky = postcss.rule({
    selector: ".ts-discovery-card.ts-discovery-card--sticky[data-v-0a9f8238]",
  });
  sticky.append(
    decl("border-radius", "var(--tsv-border-radius) !important"),
    decl("background-color", "var(--tsv-tint) !important"),
    decl("background-image", gradient + " !important"),
    decl("background-repeat", "no-repeat !important"),
  );
  nodes.push(sticky);

  nodes.push(sectionComment("4. Ad Removal"));
  for (const rule of AD_REMOVAL_RULES) {
    const node = postcss.rule({ selector: rule.sel });
    for (const [prop, value] of rule.decls) {
      node.append(decl(prop, value));
    }
    nodes.push(node);
  }

  return nodes;
}

function buildHeader(f: Flavor, accentDisplay: string | null): string {
  const acc = accentDisplay ? ` - ${accentDisplay} accent` : "";
  return `Catppuccin ${f.display}${acc} - a soothing pastel theme for TeamSpeak 5/6.\nDo not edit by hand.`;
}

export function buildBaseCss(
  flavorId: FlavorId,
  accent: AccentId = "blue",
): string {
  const f = FLAVORS[flavorId];
  const m = mapFlavor(f, accent);
  const nodes: (Rule | postcss.Comment)[] = [];
  nodes.push(postcss.comment({ text: buildHeader(f, null) }));
  nodes.push(buildVarRule(f, m, accent));
  nodes.push(...buildStaticNodes(f, accent));
  nodes.push(sectionComment("End of Catppuccin Theme CSS"));
  return postcss.root({ nodes }).toString() + "\n";
}

export function buildAccentCss(flavorId: FlavorId, accent: AccentId): string {
  const f = FLAVORS[flavorId];
  const m = mapFlavor(f, accent);
  const accentDisplay = ACCENTS.find((a) => a.id === accent)!.display;
  const root = postcss.root();
  root.append(postcss.comment({ text: buildHeader(f, accentDisplay) }));
  root.append(postcss.atRule({ name: "import", params: `url(${f.id}.css)` }));
  const overrides = postcss.rule({ selector: ":root, ::after, ::before" });
  overrides.append(
    sectionComment("1. Core Variables (--teamspeak-*)"),
    decl("--teamspeak-blue", m.accent.hex),
    decl("--teamspeak-blue-hover", m.accent.hover),
    decl("--teamspeak-blue-transparent", rgb(f.accents[accent], 0.3)),
    decl("--teamspeak-blue-transparent-light", rgb(f.accents[accent], 0.1)),
  );
  root.append(overrides);
  return root.toString() + "\n";
}
