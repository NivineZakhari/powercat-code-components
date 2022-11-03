import * as React from 'react';

interface IconProps {
    icon: string;
    variant?: string;
    size?: number;
}

export const Icon = (props: IconProps): JSX.Element => {
    const { icon, variant = 'regular', size = 20 } = props;
    const assetId = `${icon}_${size}_${variant}`;
    return (
        <svg>
            <use href={`http://cdn.jsdelivr.net/npm/@fluentui/svg-sprites/sprites/${assetId}.sprite.svg#${assetId}`} />
        </svg>
    );
};
