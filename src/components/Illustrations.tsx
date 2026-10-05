import React from 'react';

export const SemestaAtomLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 112,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Logo Atom Semesta"
  >
    {/* Deep Blue rounded emblem base */}
    <rect x="6" y="6" width="108" height="108" rx="32" fill="#1E6FB8" />
    <rect
      x="10"
      y="10"
      width="100"
      height="100"
      rx="28"
      stroke="#89CFF0"
      strokeOpacity="0.35"
      strokeWidth="2"
    />

    {/* Soft decorative glow */}
    <circle cx="60" cy="60" r="36" fill="#89CFF0" fillOpacity="0.12" />

    {/* Orbit 1 (Tilted +35 deg) */}
    <g transform="rotate(-32 60 60)">
      <ellipse
        cx="60"
        cy="60"
        rx="42"
        ry="17"
        stroke="#89CFF0"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Electron 1 in Warm Amber */}
      <circle cx="102" cy="60" r="6.5" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2" />
    </g>

    {/* Orbit 2 (Tilted -35 deg) */}
    <g transform="rotate(32 60 60)">
      <ellipse
        cx="60"
        cy="60"
        rx="42"
        ry="17"
        stroke="#89CFF0"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Electron 2 in Baby Blue + White */}
      <circle cx="18" cy="60" r="6" fill="#FFFFFF" stroke="#89CFF0" strokeWidth="2.5" />
    </g>

    {/* Central Nucleus in Warm Amber + Baby Blue */}
    <circle cx="60" cy="60" r="12" fill="#FFC53D" />
    <circle cx="56" cy="56" r="4" fill="#FFFBEB" fillOpacity="0.8" />
    {/* Sparkle accents */}
    <circle cx="28" cy="28" r="3" fill="#FFC53D" />
    <circle cx="92" cy="30" r="2.5" fill="#89CFF0" />
    <circle cx="88" cy="92" r="3" fill="#FFC53D" />
  </svg>
);

export const ProfileAvatar: React.FC<{
  avatarKey: 'kirana' | 'dimas' | 'ratna' | 'arya' | 'custom';
  size?: number;
}> = ({ avatarKey, size = 68 }) => {
  switch (avatarKey) {
    case 'kirana':
      // Cheerful 9yo Indonesian girl with pigtails and star hairclip
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" fill="#E1F4FD" stroke="#89CFF0" strokeWidth="2.5" />
          {/* Pigtails */}
          <circle cx="17" cy="42" r="10" fill="#1E293B" />
          <circle cx="63" cy="42" r="10" fill="#1E293B" />
          {/* Hair back */}
          <circle cx="40" cy="36" r="21" fill="#1E293B" />
          {/* Shoulders / Collar */}
          <path d="M20 72C22 60 30 56 40 56C50 56 58 60 60 72" fill="#1E6FB8" />
          <path d="M33 56L40 64L47 56" fill="#FFC53D" />
          {/* Face */}
          <circle cx="40" cy="40" r="16" fill="#F6C89F" />
          {/* Bangs */}
          <path
            d="M23 36C24 24 32 20 40 20C48 20 56 24 57 36C52 31 46 30 40 32C34 30 28 31 23 36Z"
            fill="#1E293B"
          />
          {/* Eyes & Smile */}
          <circle cx="34" cy="40" r="2.3" fill="#1E293B" />
          <circle cx="46" cy="40" r="2.3" fill="#1E293B" />
          <circle cx="31" cy="44" r="3" fill="#F43F5E" fillOpacity="0.28" />
          <circle cx="49" cy="44" r="3" fill="#F43F5E" fillOpacity="0.28" />
          <path
            d="M35 46C36.8 48.5 43.2 48.5 45 46"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Hairclip in Warm Amber */}
          <circle cx="52" cy="28" r="4.5" fill="#FFC53D" />
        </svg>
      );

    case 'dimas':
      // Teenager with glasses & curious grin
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" fill="#FEF3C7" stroke="#FFC53D" strokeWidth="2.5" />
          {/* Hoodie / Shirt */}
          <path d="M18 73C20 60 28 56 40 56C52 56 60 60 62 73" fill="#1E6FB8" />
          <path d="M31 56H49L45 67H35L31 56Z" fill="#89CFF0" />
          {/* Face */}
          <circle cx="40" cy="40" r="16" fill="#F2BE91" />
          {/* Wavy Teen Hair */}
          <path
            d="M23 35C22 23 30 17 41 18C51 18 58 24 57 35C54 29 48 27 40 28C33 27 26 30 23 35Z"
            fill="#1E293B"
          />
          {/* Glasses */}
          <rect
            x="28"
            y="36"
            width="10"
            height="8"
            rx="3"
            fill="#FFFFFF"
            fillOpacity="0.5"
            stroke="#1E6FB8"
            strokeWidth="2"
          />
          <rect
            x="42"
            y="36"
            width="10"
            height="8"
            rx="3"
            fill="#FFFFFF"
            fillOpacity="0.5"
            stroke="#1E6FB8"
            strokeWidth="2"
          />
          <line x1="38" y1="40" x2="42" y2="40" stroke="#1E6FB8" strokeWidth="2" />
          <circle cx="33" cy="40" r="1.8" fill="#1E293B" />
          <circle cx="47" cy="40" r="1.8" fill="#1E293B" />
          {/* Smile */}
          <path
            d="M35 47.5C37 50 43 50 45 47.5"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'ratna':
      // Bu Ratna (Warm Indonesian mother with hijab / scarf motif)
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" fill="#E0F2FE" stroke="#89CFF0" strokeWidth="2.5" />
          {/* Hijab / Kerudung */}
          <path
            d="M17 72C17 50 24 19 40 19C56 19 63 50 63 72"
            fill="#1E6FB8"
          />
          <path
            d="M22 68C25 56 32 53 40 53C48 53 55 56 58 68"
            fill="#89CFF0"
          />
          {/* Face */}
          <circle cx="40" cy="40" r="14.5" fill="#F5C69C" />
          {/* Inner scarf trim */}
          <path
            d="M26 35C29 27 34 25 40 25C46 25 51 27 54 35"
            stroke="#FFC53D"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Eyes & Warm Smile */}
          <circle cx="34.5" cy="39.5" r="2" fill="#1E293B" />
          <circle cx="45.5" cy="39.5" r="2" fill="#1E293B" />
          <path
            d="M35 45.5C37 48 43 48 45 45.5"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Brooch in Warm Amber */}
          <circle cx="40" cy="58" r="3.5" fill="#FFC53D" />
        </svg>
      );

    case 'arya':
      // Young adult / older brother with neat hair & collar shirt
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" fill="#E0E7FF" stroke="#1E6FB8" strokeWidth="2.2" />
          {/* Jacket / Shirt */}
          <path d="M18 73C20 59 29 55 40 55C51 55 60 59 62 73" fill="#1E293B" />
          <path d="M33 55L40 67L47 55" fill="#FFC53D" />
          {/* Face */}
          <circle cx="40" cy="39" r="15.5" fill="#EWB98E" />
          <circle cx="40" cy="39" r="15.5" fill="#F0BE95" />
          {/* Hair */}
          <path
            d="M24 34C24 22 31 17 40 17C50 17 56 22 56 34C52 28 45 26 40 26C33 26 28 29 24 34Z"
            fill="#1E293B"
          />
          {/* Eyes & Eyebrows */}
          <path d="M31 35H37" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M43 35H49" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="34" cy="39.5" r="2" fill="#1E293B" />
          <circle cx="46" cy="39.5" r="2" fill="#1E293B" />
          <path
            d="M35.5 46C37.5 48 42.5 48 44.5 46"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" fill="#E1F4FD" stroke="#1E6FB8" strokeWidth="2.5" />
          <circle cx="40" cy="34" r="12" fill="#1E6FB8" />
          <path d="M22 66C24 54 31 50 40 50C49 50 56 54 58 66" fill="#89CFF0" />
          <circle cx="54" cy="24" r="5" fill="#FFC53D" />
        </svg>
      );
  }
};

export const ConceptVectorIcon: React.FC<{
  iconKey: 'parabola' | 'momentum' | 'persen' | 'newton' | 'geometri' | 'energi';
  size?: number;
}> = ({ iconKey, size = 44 }) => {
  switch (iconKey) {
    case 'parabola':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="14" fill="#E1F4FD" />
          <path
            d="M8 36C16 12 30 12 40 36"
            stroke="#1E6FB8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <circle cx="24" cy="18" r="5.5" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2" />
          <circle cx="39" cy="36" r="3.5" fill="#22C55E" />
        </svg>
      );
    case 'momentum':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="14" fill="#FEF3C7" />
          <circle cx="17" cy="24" r="7" fill="#1E6FB8" />
          <circle cx="31" cy="24" r="7" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2" />
          <path d="M24 14L26 19M24 34L26 29" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'persen':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="14" fill="#FEF3C7" />
          <line x1="15" y1="33" x2="33" y2="15" stroke="#1E6FB8" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="17" cy="17" r="4.5" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2" />
          <circle cx="31" cy="31" r="4.5" fill="#89CFF0" stroke="#1E6FB8" strokeWidth="2" />
        </svg>
      );
    case 'newton':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="14" fill="#DCFCE7" />
          <circle cx="24" cy="27" r="9" fill="#22C55E" />
          <path d="M24 18C24 14 27 12 30 12" stroke="#1E6FB8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 27H20" stroke="#FFC53D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'geometri':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="14" fill="#E0F2FE" />
          <polygon
            points="24,10 37,34 11,34"
            fill="#89CFF0"
            stroke="#1E6FB8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="27" r="4" fill="#FFC53D" />
        </svg>
      );
    case 'energi':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="14" fill="#E1F4FD" />
          <path
            d="M26 10L14 26H24L22 38L34 22H24L26 10Z"
            fill="#FFC53D"
            stroke="#1E6FB8"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

export const StoryPanelIllustration: React.FC<{ panelNumber: number }> = ({ panelNumber }) => {
  // Custom flat-vector storybook scene tailored to each of the 6 panels
  return (
    <svg
      viewBox="0 0 360 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto block"
      role="img"
      aria-label={`Ilustrasi cerita panel ${panelNumber}`}
    >
      {/* Sky Backdrop */}
      <rect width="360" height="210" fill="#E1F4FD" />

      {/* Warm Sun & Fluffy Clouds */}
      <circle cx="305" cy="42" r="22" fill="#FFC53D" />
      <circle cx="305" cy="42" r="29" fill="#FFC53D" fillOpacity="0.22" />

      <g fill="#FFFFFF" fillOpacity="0.9">
        <rect x="34" y="26" width="66" height="20" rx="10" />
        <circle cx="52" cy="26" r="12" />
        <circle cx="74" cy="24" r="14" />
        <rect x="175" y="18" width="54" height="16" rx="8" />
        <circle cx="195" cy="18" r="10" />
      </g>

      {/* Distant Indonesian Hills */}
      <path d="M0 155Q90 115 190 155T360 145V210H0Z" fill="#BAE6FD" />
      {/* Foreground Lush Garden Lawn */}
      <path d="M0 165Q140 148 360 165V210H0Z" fill="#86EFAC" />
      <rect y="182" width="360" height="28" fill="#4ADE80" />

      {/* Panel-specific storybook action */}
      {panelNumber === 1 && (
        <g>
          {/* Mango tree on right */}
          <rect x="282" y="95" width="16" height="75" rx="6" fill="#92400E" />
          <circle cx="290" cy="82" r="36" fill="#22C55E" />
          <circle cx="268" cy="95" r="24" fill="#16A34A" />
          <circle cx="275" cy="88" r="6" fill="#FFC53D" />
          <circle cx="302" cy="76" r="6" fill="#FFC53D" />
          {/* Pond in middle */}
          <ellipse cx="185" cy="182" rx="48" ry="11" fill="#89CFF0" stroke="#1E6FB8" strokeWidth="2" />
          {/* Straight flat throw falling into pond */}
          <path d="M78 135Q135 138 175 178" stroke="#1E6FB8" strokeWidth="3" strokeDasharray="5 5" />
          <circle cx="175" cy="178" r="7" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2" />
        </g>
      )}

      {panelNumber === 2 && (
        <g>
          {/* Vector arrows showing horizontal forward velocity + vertical gravity pull */}
          <circle cx="120" cy="115" r="11" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2.5" />
          {/* Forward arrow */}
          <line x1="135" y1="115" x2="215" y2="115" stroke="#1E6FB8" strokeWidth="4" strokeLinecap="round" />
          <polygon points="222,115 210,108 210,122" fill="#1E6FB8" />
          <rect x="148" y="88" width="68" height="20" rx="6" fill="#FFFFFF" />
          <text x="182" y="102" textAnchor="middle" fill="#1E6FB8" fontSize="10" fontWeight="700">
            Maju (vx)
          </text>
          {/* Downward gravity arrow */}
          <line x1="120" y1="130" x2="120" y2="175" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <polygon points="120,182 113,170 127,170" fill="#F59E0B" />
          <rect x="130" y="146" width="82" height="20" rx="6" fill="#FFFFFF" />
          <text x="171" y="160" textAnchor="middle" fill="#D97706" fontSize="10" fontWeight="700">
            Gravitasi (g)
          </text>
        </g>
      )}

      {(panelNumber === 3 || panelNumber === 4) && (
        <g>
          {/* Launcher angle indicator at 45 deg */}
          <path d="M68 165 H115" stroke="#1E6FB8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M68 165 L102 131" stroke="#1E6FB8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M95 165 A27 27 0 0 0 87 146" stroke="#FFC53D" strokeWidth="3" />
          <rect x="88" y="138" width="34" height="18" rx="6" fill="#1E6FB8" />
          <text x="105" y="150" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">
            45°
          </text>

          {/* Full Rainbow / Baby-Blue Parabolic Arc */}
          <path
            d="M68 165 Q185 28 302 165"
            stroke="#1E6FB8"
            strokeWidth="4"
            strokeDasharray="7 6"
            strokeLinecap="round"
          />
          <path
            d="M68 169 Q185 34 302 169"
            stroke="#89CFF0"
            strokeWidth="3"
            strokeOpacity="0.7"
          />

          {/* Peak badge */}
          <circle cx="185" cy="96" r="11" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2.5" />
          <circle cx="182" cy="93" r="3" fill="#FFFFFF" />
          <rect x="140" y="62" width="90" height="22" rx="8" fill="#FFFFFF" stroke="#89CFF0" strokeWidth="1.5" />
          <text x="185" y="77" textAnchor="middle" fill="#1E6FB8" fontSize="10" fontWeight="700">
            {panelNumber === 3 ? 'Lintasan 45°!' : 'Titik Puncak!'}
          </text>

          {/* Target Bamboo Basket at right */}
          <path d="M284 158H320L314 180H290L284 158Z" fill="#D97706" stroke="#78350F" strokeWidth="2" />
          <rect x="281" y="153" width="42" height="6" rx="3" fill="#FFC53D" stroke="#78350F" strokeWidth="1.5" />
        </g>
      )}

      {panelNumber === 5 && (
        <g>
          {/* Three trajectories: 30 deg, 45 deg, 60 deg */}
          <path d="M68 165 Q160 110 250 165" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M68 165 Q160 20 250 165" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M68 165 Q185 45 305 165" stroke="#1E6FB8" strokeWidth="3.5" />
          <circle cx="305" cy="165" r="7" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2" />
          <rect x="125" y="54" width="110" height="22" rx="8" fill="#FFFFFF" />
          <text x="180" y="69" textAnchor="middle" fill="#1E6FB8" fontSize="10" fontWeight="700">
            30° & 60° vs Juara 45°
          </text>
        </g>
      )}

      {panelNumber === 6 && (
        <g>
          {/* Science Launcher ready for simulation */}
          <rect x="135" y="148" width="90" height="28" rx="8" fill="#1E6FB8" />
          <g transform="rotate(-45 180 148)">
            <rect x="170" y="105" width="22" height="48" rx="6" fill="#89CFF0" stroke="#1E6FB8" strokeWidth="2.5" />
            <circle cx="181" cy="102" r="9" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2" />
          </g>
          <rect x="125" y="62" width="115" height="24" rx="8" fill="#FFC53D" />
          <text x="182" y="78" textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="800">
            Siap Uji Simulasi!
          </text>
        </g>
      )}

      {/* Character Kirana on left side of garden */}
      <g transform="translate(26, 112)">
        {/* Hair & Pigtails */}
        <circle cx="14" cy="24" r="6" fill="#1E293B" />
        <circle cx="42" cy="24" r="6" fill="#1E293B" />
        <circle cx="28" cy="20" r="14" fill="#1E293B" />
        {/* Shirt */}
        <path d="M14 58C15 42 21 38 28 38C35 38 41 42 42 58" fill="#1E6FB8" />
        {/* Arm pointing / throwing */}
        <path d="M38 43L54 31" stroke="#F6C89F" strokeWidth="5" strokeLinecap="round" />
        {/* Head */}
        <circle cx="28" cy="24" r="11" fill="#F6C89F" />
        <circle cx="25" cy="23" r="1.6" fill="#1E293B" />
        <circle cx="32" cy="23" r="1.6" fill="#1E293B" />
        <path d="M25 28C27 30 30 30 32 28" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="36" cy="15" r="3.5" fill="#FFC53D" />
      </g>
    </svg>
  );
};

export const TrophyVectorIllustration: React.FC<{ size?: number }> = ({ size = 132 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Ilustrasi Piala Keberhasilan"
  >
    {/* Soft circular celebration aura */}
    <circle cx="70" cy="70" r="60" fill="#E1F4FD" />
    <circle cx="70" cy="70" r="46" fill="#89CFF0" fillOpacity="0.28" />

    {/* Floating stars & confetti */}
    <circle cx="26" cy="40" r="5" fill="#FFC53D" />
    <circle cx="114" cy="36" r="4.5" fill="#1E6FB8" />
    <circle cx="22" cy="88" r="4" fill="#22C55E" />
    <circle cx="116" cy="84" r="5.5" fill="#FFC53D" />
    <path d="M70 12L73 20L81 23L73 26L70 34L67 26L59 23L67 20L70 12Z" fill="#FFC53D" />

    {/* Trophy Handles */}
    <path
      d="M44 48H32C27 48 24 52 24 57C24 66 32 73 44 74"
      stroke="#F59E0B"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M96 48H108C113 48 116 52 116 57C116 66 108 73 96 74"
      stroke="#F59E0B"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Trophy Cup Body */}
    <path
      d="M42 38H98V64C98 80 85 92 70 92C55 92 42 80 42 64V38Z"
      fill="#FFC53D"
      stroke="#1E6FB8"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* Cup Highlight */}
    <path d="M52 46V62C52 70 56 76 62 79" stroke="#FFFBEB" strokeWidth="4" strokeLinecap="round" />

    {/* Star Emblem on Cup */}
    <path
      d="M70 49L73.5 56.5L81.5 57.5L75.5 63L77 71L70 67L63 71L64.5 63L58.5 57.5L66.5 56.5L70 49Z"
      fill="#FFFFFF"
      stroke="#1E6FB8"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Stem & Pedestal Base */}
    <rect x="63" y="92" width="14" height="16" fill="#F59E0B" stroke="#1E6FB8" strokeWidth="3" />
    <rect x="46" y="108" width="48" height="12" rx="6" fill="#1E6FB8" />
    <rect x="54" y="112" width="32" height="4" rx="2" fill="#89CFF0" />
  </svg>
);

export const BadgeVectorIcon: React.FC<{
  iconType: 'rocket' | 'flame' | 'compass' | 'star';
}> = ({ iconType }) => {
  switch (iconType) {
    case 'rocket':
      return (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" fill="#E1F4FD" stroke="#89CFF0" strokeWidth="2" />
          <path
            d="M24 11C29 15 31 22 31 29H17C17 22 19 15 24 11Z"
            fill="#1E6FB8"
          />
          <circle cx="24" cy="22" r="3.5" fill="#FFC53D" />
          <path d="M19 29L16 35H32L29 29" fill="#FFC53D" />
        </svg>
      );
    case 'flame':
      return (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" fill="#FEF3C7" stroke="#FFC53D" strokeWidth="2" />
          <path
            d="M24 11C24 11 33 18 33 27C33 32.5 29 37 24 37C19 37 15 32.5 15 27C15 22 19 17 24 11Z"
            fill="#F59E0B"
          />
          <path
            d="M24 21C24 21 28 24.5 28 28.5C28 31 26.2 33 24 33C21.8 33 20 31 20 28.5C20 26 22 23.5 24 21Z"
            fill="#FFC53D"
          />
        </svg>
      );
    case 'compass':
      return (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" />
          <circle cx="24" cy="24" r="12" fill="#FFFFFF" stroke="#1E6FB8" strokeWidth="2.5" />
          <polygon points="24,15 27,24 24,33 21,24" fill="#FFC53D" />
          <polygon points="24,15 27,24 21,24" fill="#1E6FB8" />
        </svg>
      );
    case 'star':
      return (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" fill="#E1F4FD" stroke="#1E6FB8" strokeWidth="2" />
          <path
            d="M24 12L27.5 19.5L35.5 20.5L29.5 26L31 34L24 30L17 34L18.5 26L12.5 20.5L20.5 19.5L24 12Z"
            fill="#FFC53D"
            stroke="#1E6FB8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};
