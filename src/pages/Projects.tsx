import {
    Button,
    Card,
    DatePicker,
    Divider,
    Input,
    Modal,
    Row,
    Col,
    Pagination,
} from "antd";
import styles from "./Projects.module.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { StoreModel } from "../model/storeModel";
import { Project } from "../services/types/projects-service-types";

interface FormData {
    name: string;
    description: string;
    start_date: string | null;
    end_date: string;
}

interface EditFormData {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    has_end_date_og: boolean;
}

export function Projects() {
    const formDataOg = {
        name: "",
        description: "",
        start_date: "",
        end_date: "",
    };

    const editFormDataOg = {
        id: 0,
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        has_end_date_og: false,
    };
    const numItemsPerPage = 3;
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>(formDataOg);

    const [editFormData, setEditFormData] =
        useState<EditFormData>(editFormDataOg);

    const loadingProjects = useStoreState<StoreModel>(
        (state) => state.projects.loading
    );

    const projects: Project[] = useStoreState<StoreModel>(
        (state) => state.projects.projects
    );

    const countProjects = useStoreState<StoreModel>(
        (state) => state.projects.countProjects
    );

    const getProjects = useStoreActions<StoreModel>(
        (actions) => actions.projects.getProjects
    );

    const createProject = useStoreActions<StoreModel>(
        (actions) => actions.projects.createProject
    );
    const updateProject = useStoreActions<StoreModel>(
        (actions) => actions.projects.updateProject
    );

    function handleCreateChange(key: string, value: string) {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    function handleEditChange(key: string, value: string) {
        setEditFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    async function handleCreateOk() {
        await createProject({
            name: formData.name,
            description: formData.description,
            start_date: dayjs(formData.start_date).format("YYYY-MM-DD"),
            end_date: formData.end_date
                ? dayjs(formData.end_date).format("YYYY-MM-DD")
                : "",
        });
        await getProjects({ per_page: numItemsPerPage });
        setCreateModalOpen(false);
        setFormData(formDataOg);
    }

    async function handleEditOk() {
        await updateProject({
            id: editFormData.id,
            name: editFormData.name,
            description: editFormData.description,
            end_date: editFormData.end_date,
        });
        setEditFormData(editFormDataOg);
        await getProjects({ per_page: numItemsPerPage, page: currentPage });
        setEditModalOpen(false);
    }

    function isCreateFormDataInvalid(data: FormData) {
        return Object.entries(data).some(([key, value]) => {
            if (key === "end_date") return false;

            if (key === "start_date" && "end_date" in data) {
                const startDate = dayjs(data.start_date);
                const endDate = dayjs(data.end_date);

                if (
                    startDate.isValid() &&
                    endDate.isValid() &&
                    endDate.isBefore(startDate)
                ) {
                    return true;
                }
            }

            return value === null || value === "" || value.length <= 0;
        });
    }

    function isEditFormDataInvalid(data: EditFormData) {
        return Object.entries(data).some(([key, value]) => {
            if (key === "end_date") return false;

            return value === null || value === "" || value.length <= 0;
        });
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    const updatePageSize = () => {
        const width = window.innerWidth;
        if (width < 576) {
            setPageSize(1);
        } else if (width < 768) {
            setPageSize(2);
        } else {
            setPageSize(3);
        }
    };

    useEffect(() => {
        getProjects({ per_page: numItemsPerPage });
        updatePageSize();
        window.addEventListener("resize", updatePageSize);
        return () => window.removeEventListener("resize", updatePageSize);
    }, []);

    useEffect(() => {
        getProjects({ page: currentPage, per_page: numItemsPerPage });
    }, [currentPage]);

    return (
        <>
            <Card
                loading={loadingProjects}
                className={styles.card}
                title={<span className={styles.customTitle}>Projetos</span>}
            >
                <Button
                    className={styles.newProjectButton}
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setFormData(formDataOg);
                        setCreateModalOpen(true);
                    }}
                >
                    Criar projeto
                </Button>

                <Row gutter={[16, 16]}>
                    {projects
                        ? projects.map((project) => (
                              <Col
                                  key={project.name}
                                  xs={24}
                                  sm={12}
                                  md={8}
                                  lg={8}
                                  className={styles.responsiveCol}
                              >
                                  <Card
                                      title={
                                          <span
                                              style={{ color: "var(--white)" }}
                                          >
                                              {project.name}
                                          </span>
                                      }
                                      className={styles.projectCard}
                                      extra={
                                          <EditOutlined
                                              style={{ color: "var(--white)" }}
                                              onClick={() => {
                                                  setEditFormData({
                                                      id: project.id,
                                                      name: project.name,
                                                      description:
                                                          project.description,
                                                      start_date:
                                                          project.start_date,
                                                      end_date:
                                                          project.end_date,
                                                      has_end_date_og:
                                                          !!project.end_date,
                                                  });
                                                  setEditModalOpen(true);
                                              }}
                                          />
                                      }
                                  >
                                      <p>{project.description}</p>
                                      <Divider />
                                      <p>
                                          Início:{" "}
                                          {dayjs(project.start_date).format(
                                              "DD/MM/YYYY"
                                          )}
                                      </p>
                                      {project.end_date ? (
                                          <p>
                                              Fim:{" "}
                                              {dayjs(project.end_date).format(
                                                  "DD/MM/YYYY"
                                              )}
                                          </p>
                                      ) : (
                                          <></>
                                      )}
                                  </Card>
                              </Col>
                          ))
                        : "sem projetos"}
                </Row>

                <div className={styles.paginationContainer}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={countProjects}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            </Card>

            <Modal
                className={styles.modalCreateProject}
                open={createModalOpen}
                cancelText="Cancelar"
                onCancel={() => {
                    setFormData(formDataOg);
                    setCreateModalOpen(false);
                }}
                onOk={handleCreateOk}
                okButtonProps={{ disabled: isCreateFormDataInvalid(formData) }}
            >
                <label htmlFor="name">Nome do projeto</label>
                <Input
                    id="name"
                    value={formData.name}
                    className={styles.inputName}
                    onChange={(e) => handleCreateChange("name", e.target.value)}
                />
                <label htmlFor="description">Descrição do projeto</label>
                <Input.TextArea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                        handleCreateChange("description", e.target.value)
                    }
                />
                <div className={styles.datePickerContainer}>
                    <DatePicker
                        format="DD/MM/YYYY"
                        placeholder="Início"
                        id="start_date"
                        className={styles.startDate}
                        value={
                            formData.start_date
                                ? dayjs(formData.start_date)
                                : null
                        }
                        onChange={(date) => {
                            handleCreateChange(
                                "start_date",
                                date ? date.format("YYYY-MM-DD") : ""
                            );
                        }}
                    />
                    <DatePicker
                        format="DD/MM/YYYY"
                        placeholder="Fim"
                        id="end_date"
                        value={
                            formData.end_date ? dayjs(formData.end_date) : null
                        }
                        onChange={(date) => {
                            handleCreateChange(
                                "end_date",
                                date ? date.format("YYYY-MM-DD") : ""
                            );
                        }}
                        allowClear
                    />
                </div>
            </Modal>
            <Modal
                className={styles.modalEditProject}
                open={editModalOpen}
                cancelText="Cancelar"
                onCancel={() => {
                    setEditFormData(editFormDataOg);
                    setEditModalOpen(false);
                }}
                onOk={handleEditOk}
                okButtonProps={{
                    disabled: isEditFormDataInvalid(editFormData),
                }}
            >
                <label htmlFor="name">Nome do projeto</label>
                <Input
                    id="name"
                    value={editFormData.name}
                    className={styles.inputName}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                />
                <label htmlFor="description">Descrição do projeto</label>
                <Input.TextArea
                    id="description"
                    value={editFormData.description}
                    onChange={(e) =>
                        handleEditChange("description", e.target.value)
                    }
                />
                <label htmlFor="end_date">Fim do projeto:</label>
                <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Fim"
                    id="end_date"
                    className={styles.editEndDate}
                    value={
                        editFormData.end_date
                            ? dayjs(editFormData.end_date)
                            : null
                    }
                    onChange={(date) => {
                        handleEditChange(
                            "end_date",
                            date ? date.format("YYYY-MM-DD") : ""
                        );
                    }}
                    allowClear={!editFormData.has_end_date_og}
                />
            </Modal>
        </>
    );
}
