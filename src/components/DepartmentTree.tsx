import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore'


interface Department {
  department: string;
  sub_departments: string[];
}

interface DepartmentTreeProps {
  data: Department[];
}

const DepartmentTree: React.FC<DepartmentTreeProps> = ({ data }) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleToggle = (department: string) => {
    const currentIndex = selectedDepartments.indexOf(department);
    const newSelectedDepartments = [...selectedDepartments];

    if (currentIndex === -1) {
      // Add the selected department and all its sub-departments
      newSelectedDepartments.push(department);
      data.find((item) => item.department === department)?.sub_departments.forEach((subDep) => {
        newSelectedDepartments.push(`${department}_${subDep}`);
      });
    } else {
      // Remove the selected department and all its sub-departments
      newSelectedDepartments.splice(currentIndex, 1);
      data.find((item) => item.department === department)?.sub_departments.forEach((subDep) => {
        const subIndex = newSelectedDepartments.indexOf(`${department}_${subDep}`);
        newSelectedDepartments.splice(subIndex, 1);
      });
    }

    setSelectedDepartments(newSelectedDepartments);
  };

  const renderSubDepartments = (department: string, subDepartments: string[]) => {
    return subDepartments.map((subDep) => (
      <ListItem key={`${department}_${subDep}`} button>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={selectedDepartments.includes(`${department}_${subDep}`)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={subDep} />
      </ListItem>
    ));
  };

  const renderDepartments = () => {
    return data.map((item) => (
      <div key={item.department}>
        <ListItem button onClick={() => handleToggle(item.department)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={selectedDepartments.includes(item.department)}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={item.department} />
          {selectedDepartments.includes(item.department) ? (
            <ExpandLess fontSize="small" />
          ) : (
            <ExpandMore fontSize="small" />
          )}
        </ListItem>
        <Collapse in={selectedDepartments.includes(item.department)} timeout="auto" unmountOnExit>
          <List disablePadding>{renderSubDepartments(item.department, item.sub_departments)}</List>
        </Collapse>
      </div>
    ));
  };

  return <List>{renderDepartments()}</List>;
};

export default DepartmentTree;
