import { Button, ButtonSize, ButtonVariant } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useColor } from "@/hooks/useColor";
import { useModeToggle } from "@/hooks/useModeToggle";

import { Moon, Sun } from "lucide-react-native";
import { useEffect, useState } from "react";

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const ModeToggle = ({ variant = "outline", size = "icon" }: Props) => {
  const { toggleMode, isDark } = useModeToggle();
  const primaryColor = useColor("primary");

  const [showIcon, setShowIcon] = useState<"sun" | "moon">(
    isDark ? "moon" : "sun",
  );

  useEffect(() => {
    setShowIcon(isDark ? "moon" : "sun");
  }, [isDark]);

  return (
    <Button
      variant={variant}
      animation={false}
      size={size}
      onPress={toggleMode}>
      <Icon
        color={primaryColor}
        fill={primaryColor}
        name={showIcon === "moon" ? Sun : Moon}
        size={24}
      />
    </Button>
  );
};
