
const urdf = `
<robot name="pi_robot">

  <!-- * * * Link Definitions * * * -->

  <link name="base_link">
    <visual>
        <origin xyz="0 0 0.0425" rpy="0 0 0"/>
      <geometry>
        <box size="0.32 0.26 0.085"/>
      </geometry>
      <material name="Cyan1">
            <color rgba="0 0.9 0.9 1.0"/>
        </material>
    </visual>	
  </link>

  <link name="base_laser">
    <visual>
        <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.025" length="0.07"/>
      </geometry>
      <material name="Black1">
            <color rgba="0.2 0.2 0.2 1.0"/>
        </material>
    </visual>	
  </link>

  <link name="cpu_link">
    <visual>
        <origin xyz="0 0 0.035" rpy="0 0 0"/>
      <geometry>
        <box size="0.19 0.19 0.07"/>
      </geometry>
      <material name="Cyan2">
            <color rgba="0 0.7 0.7 1.0"/>
        </material>
    </visual>	
  </link>

    <link name="upper_base_link">
    <visual>
      <origin xyz="0 0 0.05" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.085" length="0.10"/>
      </geometry>
        <material name="Cyan3">
        <color rgba="0 0.5 0.5 0"/>
      </material>
    </visual>
  </link>

    <link name="torso_link">
    <visual>
      <origin xyz="0 0 0.12" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.05" length="0.24"/>
      </geometry>
        <material name="Yellow2">
        <color rgba="0.8 0.8 0 1.0"/>
      </material>
    </visual>
  </link>

  <link name="head_pan_link">
    <visual>
      <origin xyz="0 0 0.0225" rpy="0 0 0"/>
      <geometry>
        <box size="0.05 0.045 0.045"/>
      </geometry>
        <material name="Green1">
        <color rgba="0 1 0 1.0"/>
      </material>
    </visual>
  </link>

  <link name="head_tilt_link">
    <visual>
      <origin xyz="0 0 0.02" rpy="0 0 0"/>
      <geometry>
        <box size="0.03 0.038 0.04"/>
      </geometry>
        <material name="Green2">
        <color rgba="0.1 0.8 0 1.0"/>
      </material>
    </visual>
  </link>

  <link name="neck_link">
    <visual>
      <origin xyz="0 0 0.021" rpy="0 0 0"/>
      <geometry>
        <box size="0.03 0.05 0.042"/>
      </geometry>
        <material name="Green3">
        <color rgba="0.1 0.5 0.1 1.0"/>
      </material>
    </visual>
  </link>

  <link name="head_link">
    <visual>
      <origin xyz="0 0 0.025" rpy="0 0 0"/>
      <geometry>
        <box size="0.03 0.07 0.11"/>
      </geometry>
        <material name="Grey1">
        <color rgba="0.9 0.9 0.9 1.0"/>
      </material>
    </visual>
  </link>

  <!--	
  <link name="eyes_link">
    <visual>
      <origin xyz="0 0 0.035" rpy="0 0 0" />
      <geometry>
        <box size="0.01 0.04 0.01" />
      </geometry>
        <material name="Blue2">
        <color rgba="0 0 0.7 1.0"/>
      </material>
    </visual>
  </link>
  -->

  <link name="antenna_link">
    <visual>
      <origin xyz="0 0 0.035" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.002" length="0.05"/>
      </geometry>
        <material name="Grey3">
        <color rgba="0.8 0.8 0.8 1.0"/>
      </material>
    </visual>
  </link>

  <link name="left_shoulder_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.025 0.015 0.05"/>
      </geometry>
        <material name="Green1">
        <color rgba="0 1 0 1.0"/>
      </material>
    </visual>
  </link>

  <link name="right_shoulder_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.025 0.015 0.05"/>
      </geometry>
        <material name="Green1">
        <color rgba="0 1 0 1.0"/>
      </material>
    </visual>
  </link>

  <link name="left_shoulder_forward_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.03 0.05 0.03"/>
      </geometry>
        <material name="Blue1">
        <color rgba="0 0 0.9 1.0"/>
      </material>
    </visual>
  </link>
    
  <link name="right_shoulder_forward_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.03 0.05 0.03"/>
      </geometry>
        <material name="Blue1">
        <color rgba="0 0 0.9 1.0"/>
      </material>
    </visual>
  </link>

  <link name="left_shoulder_up_link">
    <visual>
      <origin xyz="0 0 0" rpy="1.57 0 0"/>
      <geometry>
        <box size="0.03 0.05 0.03"/>
      </geometry>
        <material name="Blue2">
        <color rgba="0 0 0.7 1.0"/>
      </material>
    </visual>
  </link>

  <link name="right_shoulder_up_link">
    <visual>
      <origin xyz="0 0 0" rpy="1.57 0 0"/>
      <geometry>
        <box size="0.03 0.05 0.03"/>
      </geometry>
        <material name="Blue2">
        <color rgba="0 0 0.7 1.0"/>
      </material>
    </visual>
  </link>

  <link name="left_upper_arm_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.0075" length="0.05"/>
      </geometry>
        <material name="Grey1">
        <color rgba="0.9 0.9 0.9 1.0"/>
      </material>
    </visual>
  </link>

  <link name="right_upper_arm_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.0075" length="0.05"/>
      </geometry>
        <material name="Grey1">
        <color rgba="0.9 0.9 0.9 1.0"/>
      </material>
    </visual>
  </link>

  <link name="left_elbow_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 1.57"/>
      <geometry>
        <box size="0.035 0.035 0.05"/>
      </geometry>
        <material name="Blue2">
        <color rgba="0 0 0.7 1.0"/>
      </material>
    </visual>
  </link>

  <link name="right_elbow_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 1.57"/>
      <geometry>
        <box size="0.035 0.035 0.05"/>
      </geometry>
        <material name="Blue2">
        <color rgba="0 0 0.7 1.0"/>
      </material>
    </visual>
  </link>

  <link name="left_lower_arm_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.0075" length="0.11"/>
      </geometry>
        <material name="Grey1">
        <color rgba="0.9 0.9 0.9 1.0"/>
      </material>
    </visual>
  </link>

  <link name="right_lower_arm_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.0075" length="0.11"/>
      </geometry>
        <material name="Grey1">
        <color rgba="0.9 0.9 0.9 1.0"/>
      </material>
    </visual>
  </link>

  <link name="left_wrist_link">
    <visual>
      <origin xyz="0 0 0" rpy="1.57 0 0"/>
      <geometry>
        <box size="0.03 0.05 0.03"/>
      </geometry>
        <material name="Blue2">
        <color rgba="0 0 0.7 1.0"/>
      </material>
    </visual>
  </link>

  <link name="right_wrist_link">
    <visual>
      <origin xyz="0 0 0" rpy="1.57 0 0"/>
      <geometry>
        <box size="0.03 0.05 0.03"/>
      </geometry>
        <material name="Blue2">
        <color rgba="0 0 0.7 1.0"/>
      </material>
    </visual>
  </link>

  <link name="left_hand_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.03 0.01 0.06"/>
      </geometry>
        <material name="Grey1">
        <color rgba="0.7 0.7 0.7 1.0"/>
      </material>
    </visual>
  </link>

  <link name="right_hand_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.03 0.01 0.06"/>
      </geometry>
        <material name="Grey1">
        <color rgba="0.9 0.9 0.9 1.0"/>
      </material>
    </visual>
  </link>

  <!-- * * * Joint Definitions * * * -->

  <joint name="cpu_joint" type="fixed">
      <parent link="base_link"/>
      <child link="cpu_link"/>
      <origin xyz="0.025 0 0.085" rpy="0 0 0"/>
  </joint>

  <joint name="base_laser_joint" type="fixed">
      <parent link="base_link"/>
      <child link="base_laser"/>
      <origin xyz="0.18 0 0.07" rpy="0 0 0"/>
  </joint>

  <joint name="upper_base_joint" type="fixed">
      <parent link="cpu_link"/>
      <child link="upper_base_link"/>
      <origin xyz="0 0 0.07" rpy="0 0 0"/>
  </joint>

  <joint name="torso_joint" type="revolute">
      <parent link="upper_base_link"/>
      <child link="torso_link"/>
      <origin xyz="0 0 0.10" rpy="0 0 0"/>
      <axis xyz="0 0 1"/>
      <limit lower="-3.1416" upper="3.1416" effort="10" velocity="3"/>
    </joint>

  <joint name="head_pan_servo" type="fixed">
      <parent link="torso_link"/>
      <child link="head_pan_link"/>
      <origin xyz="0 0 0.225" rpy="0 0 0"/>
  </joint>

  <joint name="head_pan_joint" type="revolute">
      <parent link="head_pan_link"/>
      <child link="head_tilt_link"/>
      <origin xyz="0 0 0.045" rpy="0 0 0"/>
      <axis xyz="0 0 1"/>
      <limit lower="-3.1416" upper="3.1416" effort="10" velocity="3"/>
    </joint>
    
  <joint name="head_tilt_joint" type="revolute">
      <parent link="head_tilt_link"/>
      <child link="neck_link"/>
      <origin xyz="0 0 0.04" rpy="0 0 0"/>
      <axis xyz="0 1 0"/>
      <limit lower="-1.57" upper="1.57" effort="10" velocity="3"/>
    </joint>
    
  <joint name="neck_joint" type="fixed">
      <parent link="neck_link"/>
      <child link="head_link"/>
      <origin xyz="0.05 0 0.015" rpy="0 0 0"/>
  </joint>
  <!--	
  <joint name="eyes_joint" type="fixed">
      <parent link="head_link" />
      <child link="eyes_link" />
      <origin xyz="0.02 0 0.03" rpy="0 0 0" />
  </joint>
  -->

  <joint name="antenna_joint" type="fixed">
      <parent link="head_link"/>
      <child link="antenna_link"/>
      <origin xyz="0.0 -0.025 0.065" rpy="0 0 0"/>
  </joint>

  <joint name="left_shoulder_joint" type="fixed">
      <parent link="torso_link"/>
      <child link="left_shoulder_link"/>
      <origin xyz="0 0.055 0.165" rpy="0 0 0"/>
  </joint>

  <joint name="right_shoulder_joint" type="fixed">
      <parent link="torso_link"/>
      <child link="right_shoulder_link"/>
      <origin xyz="0 -0.055 0.165" rpy="0 0 0"/>
  </joint>

  <joint name="left_shoulder_forward_joint" type="revolute">
      <parent link="left_shoulder_link"/>
      <child link="left_shoulder_forward_link"/>
      <origin xyz="0 0.025 0" rpy="0 0 0"/>
        <limit lower="-1.57" upper="1.57" effort="10" velocity="3"/>
        <axis xyz="0 0 1"/>
  </joint>

  <joint name="right_shoulder_forward_joint" type="revolute">
      <parent link="right_shoulder_link"/>
      <child link="right_shoulder_forward_link"/>
      <origin xyz="0 -0.025 0" rpy="0 0 0"/>
        <limit lower="-1.57" upper="1.57" effort="10" velocity="3"/>
        <axis xyz="0 0 1"/>
  </joint>

  <joint name="left_shoulder_up_joint" type="revolute">
      <parent link="left_shoulder_forward_link"/>
      <child link="left_shoulder_up_link"/>
      <origin xyz="0 0.04 -0.01" rpy="0 -0.707 0"/>
        <limit lower="-1.57" upper="1.57" effort="10" velocity="3"/>
        <axis xyz="0 1 0"/>
  </joint>

  <joint name="right_shoulder_up_joint" type="revolute">
      <parent link="right_shoulder_forward_link"/>
      <child link="right_shoulder_up_link"/>
      <origin xyz="0 -0.04 -0.01" rpy="0 -0.707 0"/>
        <limit lower="-1.57" upper="1.57" effort="10" velocity="3"/>
        <axis xyz="0 1 0"/>
  </joint>

  <joint name="left_upper_arm_joint" type="fixed">
      <parent link="left_shoulder_up_link"/>
      <child link="left_upper_arm_link"/>
      <origin xyz="0 0 -0.05" rpy="0 0 0"/>
  </joint>

  <joint name="right_upper_arm_joint" type="fixed">
      <parent link="right_shoulder_up_link"/>
      <child link="right_upper_arm_link"/>
      <origin xyz="0 0 -0.05" rpy="0 0 0"/>
  </joint>

  <joint name="left_elbow_joint" type="revolute">
      <parent link="left_upper_arm_link"/>
      <child link="left_elbow_link"/>
      <origin xyz="-0.005 0 -0.05" rpy="0 0 0"/>
        <limit lower="-3.146" upper="3.146" effort="10" velocity="3"/>
        <axis xyz="0 0 1"/>
  </joint>

  <joint name="right_elbow_joint" type="revolute">
      <parent link="right_upper_arm_link"/>
      <child link="right_elbow_link"/>
      <origin xyz="-0.005 0 -0.05" rpy="0 0 0"/>
        <limit lower="-3.146" upper="3.146" effort="10" velocity="3"/>
        <axis xyz="0 0 1"/>
  </joint>

  <joint name="left_lower_arm_joint" type="fixed">
      <parent link="left_elbow_link"/>
      <child link="left_lower_arm_link"/>
      <origin xyz="0 0 -0.08" rpy="0 0 0"/>
  </joint>

  <joint name="right_lower_arm_joint" type="fixed">
      <parent link="right_elbow_link"/>
      <child link="right_lower_arm_link"/>
      <origin xyz="0 0 -0.08" rpy="0 0 0"/>
  </joint>

  <joint name="left_wrist_joint" type="revolute">
      <parent link="left_lower_arm_link"/>
      <child link="left_wrist_link"/>
      <origin xyz="0 0 -0.05" rpy="0 0 0"/>
        <limit lower="-1.57" upper="1.57" effort="10" velocity="3"/>
        <axis xyz="1 0 0"/>
  </joint>

  <joint name="right_wrist_joint" type="revolute">
      <parent link="right_lower_arm_link"/>
      <child link="right_wrist_link"/>
      <origin xyz="0 0 -0.05" rpy="0 0 0"/>
        <limit lower="-1.57" upper="1.57" effort="10" velocity="3"/>
        <axis xyz="1 0 0"/>
  </joint>

  <joint name="left_hand_joint" type="fixed">
      <parent link="left_wrist_link"/>
      <child link="left_hand_link"/>
      <origin xyz="0 0 -0.055" rpy="0 0 0"/>
  </joint>

  <joint name="right_hand_joint" type="fixed">
      <parent link="right_wrist_link"/>
      <child link="right_hand_link"/>
      <origin xyz="0 0 -0.055" rpy="0 0 0"/>
  </joint>

</robot>
`

export default urdf;