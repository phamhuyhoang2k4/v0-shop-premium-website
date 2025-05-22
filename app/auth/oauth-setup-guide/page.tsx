"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"

export default function OAuthSetupGuidePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/auth/login" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("back_to_login")}
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-6">{t("google_oauth_setup_guide")}</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>
              {t("step_1")}: {t("create_google_cloud_project")}
            </h2>
            <ol>
              <li>
                {t("go_to")}{" "}
                <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
                  Google Cloud Console
                </a>
              </li>
              <li>{t("create_new_project")}</li>
              <li>{t("note_project_id")}</li>
            </ol>

            <h2>
              {t("step_2")}: {t("configure_oauth_consent_screen")}
            </h2>
            <ol>
              <li>{t("select_project")}</li>
              <li>
                {t("navigate_to")} <strong>APIs & Services &gt; OAuth consent screen</strong>
              </li>
              <li>{t("select_user_type")} (External)</li>
              <li>
                {t("fill_required_fields")}:
                <ul>
                  <li>{t("app_name")}</li>
                  <li>{t("user_support_email")}</li>
                  <li>{t("developer_contact_info")}</li>
                </ul>
              </li>
              <li>
                {t("add_scopes")}:
                <ul>
                  <li>email</li>
                  <li>profile</li>
                </ul>
              </li>
              <li>{t("add_test_users_if_needed")}</li>
              <li>{t("save_and_continue")}</li>
            </ol>

            <h2>
              {t("step_3")}: {t("create_oauth_credentials")}
            </h2>
            <ol>
              <li>
                {t("navigate_to")} <strong>APIs & Services &gt; Credentials</strong>
              </li>
              <li>
                {t("click")} <strong>Create Credentials</strong> {t("and_select")} <strong>OAuth client ID</strong>
              </li>
              <li>
                {t("select_application_type")}: <strong>Web application</strong>
              </li>
              <li>{t("add_name")}</li>
              <li>
                {t("add_authorized_javascript_origins")}:
                <pre className="bg-muted p-2 rounded-md overflow-x-auto">https://your-vercel-app-url.vercel.app</pre>
                <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                  http://localhost:3000 ({t("for_local_development")})
                </pre>
              </li>
              <li>
                {t("add_authorized_redirect_uris")}:
                <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                  https://your-project-ref.supabase.co/auth/v1/callback
                </pre>
              </li>
              <li>
                {t("click")} <strong>Create</strong>
              </li>
              <li>{t("note_client_id_and_secret")}</li>
            </ol>

            <h2>
              {t("step_4")}: {t("configure_supabase")}
            </h2>
            <ol>
              <li>
                {t("go_to")}{" "}
                <a href="https://app.supabase.io/" target="_blank" rel="noopener noreferrer">
                  Supabase Dashboard
                </a>
              </li>
              <li>{t("select_your_project")}</li>
              <li>
                {t("navigate_to")} <strong>Authentication &gt; Providers</strong>
              </li>
              <li>{t("find_google_and_enable_it")}</li>
              <li>{t("enter_client_id_and_secret")}</li>
              <li>{t("save_changes")}</li>
            </ol>

            <div className="bg-muted p-4 rounded-md mt-6">
              <h3 className="text-lg font-semibold">{t("important_notes")}</h3>
              <ul>
                <li>{t("ensure_redirect_uri_matches")}</li>
                <li>{t("verify_scopes")}</li>
                <li>{t("check_project_settings")}</li>
                <li>{t("test_in_incognito")}</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">{t("still_having_issues")}</h3>
              <p>
                {t("contact_support")}: <a href="mailto:support@example.com">support@example.com</a>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/auth/login">
              <Button>{t("back_to_login")}</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
