import { PrimatyActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { Access, CollectionConfig } from "payload/types";

const adminsAndUsers: Access = ({ req: { user } }) => {
    if (user.role === "admin") {
        return true;
    }
    return {
        id: {
            equals: user.id,
        },
    };
};

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return PrimatyActionEmailHtml({
                    actionLabel: "verify your email",
                    buttonText: "Verify here",
                    href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
                });
            },
        },
    },
    access: {
        read: adminsAndUsers,
        create: () => true,
        update: ({ req }) => req.user.role === "admin" && req.user,
        delete: ({ req }) => req.user.role === "admin" && req.user,
    },
    admin: {
        hidden: ({ user }) => user.role !== "admin",
        defaultColumns: ["id"],
    },
    fields: [
        {
            name: "products",
            label: "Products",
            admin: {
                condition: () => false,
            },
            type: "relationship",
            relationTo: "products",
            hasMany: true,
        },
        {
            name: "product_files",
            label: "Products files",
            admin: {
                condition: () => false,
            },
            type: "relationship",
            relationTo: "product_files",
            hasMany: true,
        },
        {
            name: "role",
            required: true,
            defaultValue: "user",
            type: "select",
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "User",
                    value: "user",
                },
            ],
        },
    ],
};
